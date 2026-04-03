const OfficeStaff = require("../models/office_staff");

const loginOfficeStaff = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // check if user exists
    const staff = await OfficeStaff.findOne({
      where: { mail: mail }
    });

    if (!staff) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password
    if (staff.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // success
    return res.status(200).json({
      message: "Login successful",
      staff: staff
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginOfficeStaff };