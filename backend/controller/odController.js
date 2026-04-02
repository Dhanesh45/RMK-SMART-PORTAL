// /odController.js
const sequelize = require("../db");
const Outpass = require("../models/outpass");
const ODForm = require("../models/od_form");
const Student = require("../models/student");
const { Op } = require("sequelize");
const Faculty = require("../models/faculty");
// od with outpass

const createODWithOutpass = async (req, res) => {
  const { od, outpass } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const student = await Student.findOne({
      where: { regNo: od.regNo },
    });

    if (!student) {
      await transaction.rollback();
      return res.status(404).json({ message: "Student not found" });
    }
    /** 🔥 NEW: Find counsellor to assign facultyId */
    let facultyId = null;
    const counsellorValue = student.counsellor;

    if (counsellorValue) {
      const trimmed = String(counsellorValue).trim();

      if (/^\d+$/.test(trimmed)) {
        facultyId = parseInt(trimmed, 10); // stored faculty numeric ID
      } else {
        const faculty = await Faculty.findOne({
          where: {
            [Op.or]: [{ faculty_name: trimmed }, { mail: trimmed }],
          },
        });
        if (faculty) facultyId = faculty.f_id;
      }
    }

    const createdOutpass = await Outpass.create(
      {
        studentId: student.studentId,
        facultyId,
        studentName: student.studentName,
      regNo: student.regNo,
        year: student.year,
        branch: student.branch,
        parentName: student.parentName,
        parentPhone: student.parentPhone,
        dateOfApplication: new Date(),
        forOd: true,
        cstatus: 0,
      ystatus: 0,
      hstatus: 0,
        ...outpass,
      },
      { transaction }
    );

    await ODForm.create(
      {
        student_id: student.studentId,
        facultyId,
        outpass_id: createdOutpass.outpassId,
        studentName: student.studentName,
      regNo: student.regNo,
        purpose: od.purpose,
        numberOfDays: od.numberOfDays,
        fromDate: od.fromDate,
        toDate: od.toDate,
        place: od.place,
        collegeName: od.collegeName,
        eventName: od.eventName,
        date:od.date,
        cstatus: 0,
      ystatus: 0,
      hstatus: 0,
        
      },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json({ message: "OD + Outpass created successfully" });

  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message });
  }
};
// GOKUL WORK/
const getHostellerODForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const ODhosteller = await ODForm.findAll({
       where:{
        facultyId: Number(facultyId),
        cstatus:0,
      },
      order: [["date", "DESC"]],
    });

    return res.json({ ODhosteller });
  } catch (err) {
    console.error("getHostellerODForCounsellor error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const getODoutpassforCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const outpasswithod = await Outpass.findAll({
      where:{
        facultyId: Number(facultyId),
        cstatus:0,
      },
     order: [["dateOfApplication", "DESC"]],
    });

    return res.json({ outpasswithod });
  } catch (err) {
    console.error("getODoutpassforCounsellor error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// get od and outpass for counsellor separate functions has been completed 
const updateCstatushosod = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { od_id } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const hostod = await ODForm.findByPk(od_id, { transaction });
    if (!hostod)
      return res.status(404).json({ message: "OD not found" });

    const newStatus = action === "approve" ? 1 : -1;

    // ✅ Update OD status (NO CHANGE)
    hostod.cstatus = newStatus;

    // 🔥 AUTO FORWARD TO YEAR COORDINATOR (ONLY ON APPROVE)
    if (action === "approve") {
      const student = await Student.findByPk(hostod.student_id);

      if (student && student.yearCoordinator) {
        const ycId = Number(student.yearCoordinator);

        // move OD to YC
        hostod.facultyId = ycId;
        hostod.ystatus = 0;

        // move Outpass to YC
        await Outpass.update(
          {
            facultyId: ycId,
            ystatus: 0,
          },
          {
            where: { outpassId: hostod.outpass_id },
            transaction,
          }
        );
      }
    }

    await hostod.save({ transaction });

    // ✅ Sync Outpass status (NO CHANGE)
    await Outpass.update(
      { cstatus: newStatus },
      { where: { outpassId: hostod.outpass_id }, transaction }
    );

    // 🔥 NEW LOGIC: TRANSFER OWNERSHIP ONLY IF APPROVED
    if (action === "approve") {
      // 👉 Get student to find year coordinator
      const student = await Student.findByPk(hostod.student_id, { transaction });

      if (student && student.yearCoordinator) {
        hostod.facultyId = Number(student.yearCoordinator);
        hostod.ystatus = 0; // reset year coordinator status
      } else {
        console.warn(`Student ${hostod.studentId} has no year coordinator assigned`);
      }
      await Outpass.update({facultyId: hostod.facultyId, ystatus: 0}, 
        { where: { outpassId: hostod.outpass_id }, transaction  });
      await hostod.save({ transaction });
    }
     await transaction.commit();
   
   

    return res.json({
      message: `OD ${action}d successfully (Outpass synced + forwarded to Year Coordinator)`,
    });

  } catch (err) {
    await transaction.rollback();
    console.error("updateCstatushosod error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


// 8️⃣ YEAR COORDINATOR – VIEW OD (Counsellor Approved)
const getODForYearCoordinator = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const ods = await ODForm.findAll({
      where: {
        facultyId: Number(facultyId),
        cstatus: 1,   // counsellor approved
        ystatus: 0    // pending YC
      },
      order: [["date", "DESC"]],
    });

    res.json({ ods });
  } catch (err) {
    console.error("getODForYearCoordinator error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
//9️⃣ YEAR CO-ORDINATOR – VIEW OUTPASS FOR OD
const getODOutpassForYearCoordinator = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const outpasses = await Outpass.findAll({
      where: {
        facultyId: Number(facultyId),  // ✅ FIXED
        cstatus: 1,
        ystatus: 0,
        forOd: true
      },
      order: [["dateOfApplication", "DESC"]],
    });

    res.json({ outpasses });
  } catch (err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// 🔟 FORWARD OD + OUTPASS TO YEAR COORDINATOR
// 🔟 FORWARD OD + OUTPASS TO YEAR COORDINATOR
// const forwardODToYearCoordinator = async (req, res) => {
//   const transaction = await sequelize.transaction();

//   try {
//     const { od_id } = req.params;
//     const { yearCoordinatorFacultyId } = req.body;

//     if (!yearCoordinatorFacultyId)
//       return res.status(400).json({ message: "YC facultyId required" });

//     const od = await ODForm.findByPk(od_id, { transaction });
//     if (!od) return res.status(404).json({ message: "OD not found" });

//     if (od.cstatus !== 1)
//       return res.status(400).json({ message: "OD not approved by counsellor" });

//     // ✅ MOVE OWNERSHIP TO YEAR COORDINATOR
//     od.facultyId = Number(yearCoordinatorFacultyId);
//     od.ystatus = 0;
//     await od.save({ transaction });

//     // ✅ VERY IMPORTANT: update outpass facultyId also
//     await Outpass.update(
//       {
//         facultyId: Number(yearCoordinatorFacultyId),
//         ystatus: 0
//       },
//       {
//         where: { outpassId: od.outpass_id },
//         transaction
//       }
//     );

//     await transaction.commit();
//     res.json({ message: "OD & Outpass forwarded to Year Coordinator" });

//   } catch (err) {
//     await transaction.rollback();
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// 1️⃣1️⃣ YEAR COORDINATOR APPROVE / REJECT OD
const updateYstatushosod = async (req, res) => {
  try {
    const { od_id } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const od = await ODForm.findByPk(od_id);
    if (!od) {
      return res.status(404).json({ message: "OD not found" });
    }

    const status = action === "approve" ? 1 : -1;

    od.ystatus = status;
    await od.save();

    // ✅ Sync Outpass
    await Outpass.update(
      { ystatus: status },
      { where: { outpassId: od.outpass_id } }
    );

    return res.json({
      message: `OD ${action}d by Year Coordinator`,
    });

  } catch (err) {
    console.error("updateYstatushosod error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// const updateYstatusOD = async (req, res) => {
//   const transaction = await sequelize.transaction();

//   try {
//     const { od_id } = req.params;
//     const { action } = req.body;

//     if (!["approve", "reject"].includes(action)) {
//       return res.status(400).json({ message: "Invalid action" });
//     }

//     const od = await ODForm.findByPk(od_id, { transaction });
//     if (!od) return res.status(404).json({ message: "OD not found" });

//     const status = action === "approve" ? 1 : -1;

//     od.ystatus = status;
//     await od.save({ transaction });

//     await Outpass.update(
//       { ystatus: status },
//       { where: { outpassId: od.outpass_id }, transaction }
//     );

//     await transaction.commit();
//     res.json({ message: `OD ${action}d by Year Coordinator` });

//   } catch (err) {
//     await transaction.rollback();
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
const updateYstatusOdOut = async (req, res) => {
  try {
    const { outpassId } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const outpass = await Outpass.findByPk(outpassId);
    if (!outpass) {
      return res.status(404).json({ message: "Outpass not found" });
    }

    const status = action === "approve" ? 1 : -1;

    outpass.ystatus = status;
    await outpass.save();

    return res.json({
      message: `Outpass ${action}d by Year Coordinator`,
    });

  } catch (err) {
    console.error("updateYstatusOdOut error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createODWithOutpass, 
  getHostellerODForCounsellor, 
  getODoutpassforCounsellor, 
  updateCstatushosod,

  getODForYearCoordinator,
  getODOutpassForYearCoordinator,

  getYearCoordinatorODs,
  updateYstatushosod,
  updateYstatusOdOut
  };