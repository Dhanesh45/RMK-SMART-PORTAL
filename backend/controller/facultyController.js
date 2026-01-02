const { Faculty } = require("../models");

exports.getCounsellorsByBranch = async (req, res) => {
  try {
    const { branch } = req.params;

    const counsellors = await Faculty.findAll({
      where: {
        faculty_branch: branch,
        role: "Counsellor",
      },
      attributes: ["f_id", "faculty_name", "mail"],
    });

    res.json(counsellors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching counsellors" });
  }
};
