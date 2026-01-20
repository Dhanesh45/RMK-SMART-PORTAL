// controller/outpassController.js

const { Op } = require("sequelize");
const Outpass = require("../models/outpass");
const Student = require("../models/student");
const Faculty = require("../models/faculty");

/** ================================
 * 1️⃣ GET Student by regNo  (OLD FLOW) 
 * ================================ */
exports.getStudentByRegNo = async (req, res) => {
  try {
    const { regNo } = req.params;

    const student = await Student.findOne({ where: { regNo } });

    if (!student) return res.status(404).json({ message: "Student not found" });

    return res.status(200).json(student);
  } catch (err) {
    console.error("❌ Error fetching student:", err);
    return res.status(500).json({ error: "Failed to fetch student" });
  }
};

/** ================================
 * 2️⃣ CREATE OUTPASS (OLD FLOW + COUNSELLOR SUPPORT)
 * ================================ */
exports.createOutpass = async (req, res) => {
  try {
    const {
      regNo,
      roomNumber,
      noOfDays,
      fromDate,
      toDate,
      reasonForLeave,
      parentsPermission,
      forOd,
      leavingDate,
      leavingTime,
      remarks,
    } = req.body;

    // Find student by regNo (OLD FLOW)
    const student = await Student.findOne({ where: { regNo } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    /** 🔥 NEW: Find counsellor to assign facultyId */
    let facultyId = null;
    const counsellorValue = student.counsellor;

    if (counsellorValue) {
      const trimmed = String(counsellorValue).trim();

      if (/^\d+$/.test(trimmed)) {
        facultyId = parseInt(trimmed, 10);   // stored faculty numeric ID
      } else {
        const faculty = await Faculty.findOne({
          where: {
            [Op.or]: [
              { faculty_name: trimmed },
              { mail: trimmed }
            ]
          }
        });
        if (faculty) facultyId = faculty.f_id;
      }
    }

    /** 🔥 Create Outpass (original logic + facultyId included) */
    const newOutpass = await Outpass.create({
      studentId: student.studentId,
      studentName: student.studentName,
      regNo: student.regNo,
      year: student.year,
      branch: student.branch,
      parentName: student.parentName,
      parentPhone: student.parentPhone,

      facultyId,  // <-- NEW

      roomNumber,
      noOfDays,
      fromDate,
      toDate,
      reasonForLeave,
      parentsPermission,
      forOd,
      leavingDate,
      leavingTime,
      remarks: remarks || null,

      dateOfApplication: new Date(),

      cstatus: 0,
      ystatus: 0,
      hstatus: 0,
    });

    return res.status(201).json({
      message: "Outpass created",
      newOutpass,
    });
  } catch (err) {
    console.error("❌ Error creating outpass:", err);
    return res.status(500).json({ error: "Failed to create outpass" });
  }
};

/** ================================
 * 3️⃣ COUNSELLOR VIEW OUTPASSES
 * ================================ */
exports.getOutpassesForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const outpasses = await Outpass.findAll({
      where:{
        facultyId: Number(facultyId),
        cstatus:0,
      },
      order: [["dateOfApplication", "DESC"]],
    });

    return res.json({ outpasses });
  } catch (err) {
    console.error("getOutpassesForCounsellor error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

/** ================================
 * 4️⃣ COUNSELLOR APPROVE / REJECT
 * ================================ */
exports.updateCstatus = async (req, res) => {
  try {
    const { outpassId } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const outpass = await Outpass.findByPk(outpassId);
    if (!outpass) return res.status(404).json({ message: "Outpass not found" });

    outpass.cstatus = action === "approve" ? 1 : -1;
    await outpass.save();

    return res.json({ message: `Outpass ${action}d`, outpass });
  } catch (err) {
    console.error("updateCstatus error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

/** ================================
 * 5️⃣ STUDENT VIEW THEIR OUTPASSES
 * ================================ */
exports.getOutpassesForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const outpasses = await Outpass.findAll({
      where: { studentId },
      order: [["dateOfApplication", "DESC"]],
    });

    return res.json({ outpasses });
  } catch (err) {
    console.error("getOutpassesForStudent error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
/** ================================
 * 6️⃣ YEAR COORDINATOR VIEW OUTPASSES
 * ================================ */
exports.getOutpassesForYearCoordinator = async (req, res) => {
  try {
    const outpasses = await Outpass.findAll({
      where: {
        cstatus: 1,   // counselor approved
        ystatus: 0    // pending for YC
      },
      include: [
        {
          model: Student,
          attributes: ["name", "regNo"]
        }
      ]
    });

    res.status(200).json(outpasses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching outpasses" });
  }
};

/** =========================================
 * 7️⃣ ASSIGN YEAR COORDINATOR AFTER COUNSELLOR
 * ========================================= */
exports.assignYearCoordinator = async (req, res) => {
  try {
    const { outpassId } = req.params;
    const { yearCoordinatorFacultyId } = req.body;

    if (!yearCoordinatorFacultyId) {
      return res.status(400).json({
        message: "yearCoordinatorFacultyId is required",
      });
    }

    const outpass = await Outpass.findByPk(outpassId);
    if (!outpass) {
      return res.status(404).json({ message: "Outpass not found" });
    }

    // ✅ Ensure counsellor already approved
    if (outpass.cstatus !== 1) {
      return res.status(400).json({
        message: "Outpass not approved by counsellor yet",
      });
    }

    // ✅ MOVE OWNERSHIP TO YEAR COORDINATOR
    outpass.facultyId = Number(yearCoordinatorFacultyId);
    outpass.ystatus = 0; // pending with YC

    await outpass.save();

    return res.json({
      message: "Outpass forwarded to Year Coordinator",
      outpass,
    });

  } catch (err) {
    console.error("assignYearCoordinator error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getYearCoordinatorOutpasses = async (req, res) => {
  try {
    const { facultyId } = req.params;

    if (!facultyId) {
      return res.status(400).json({ message: "facultyId is required" });
    }

    const outpasses = await Outpass.findAll({
      where: {
        facultyId: Number(facultyId),  // ✅ USE IT HERE
        cstatus: 1,
        ystatus: 0,
      },
      include: [
        {
          model: Student,
          attributes: ["studentName", "regNo"],
        },
        {
          model: Faculty,
          attributes: ["faculty_name"],
        },
      ],
      order: [["dateOfApplication", "DESC"]],
    });

    const formatted = outpasses.map((op) => ({
      outpassId: op.id,
      studentName: op.Student?.studentName,
      regNo: op.Student?.regNo,
      counsellorName: op.Faculty?.faculty_name || "N/A",
      fromDate: op.fromDate,
      toDate: op.toDate,
      reasonForLeave: op.reasonForLeave,
    }));

    res.json({ outpasses: formatted });
  } catch (error) {
    console.error("getYearCoordinatorOutpasses error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



/** ================================
 * 8️⃣ YEAR COORDINATOR APPROVE / REJECT
 * ================================ */
exports.updateYstatus = async (req, res) => {
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

    if (action === "approve") {
      outpass.ystatus = 1;

      // 🔴 MOVE facultyId HERE (SAFE)
      const student = await Student.findByPk(outpass.studentId);
      outpass.facultyId = student.hodId; // or next authority

    } else {
      outpass.ystatus = -1;
    }

    await outpass.save();
    res.json({ message: "Year coordinator action completed", outpass });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
