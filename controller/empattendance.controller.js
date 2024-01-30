// attendance.controller.js
import EmpAttendance from "../models/empattendanceSchema.js";
// markEmployeeAttendance
const markAttendance = async (req, res) => {
  try {
    const { empid, date, status } = req.body;

    const attendance = new EmpAttendance({
      empid,
      date,
      status,
    });

    await attendance.save();

    res.status(201).json({ message: `${empid} Attendance marked successfully` });
  } catch (error) {
    console.error('Error marking emp attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// getEmployeeAttendance
const getEmployeeAttendance = async (req, res) => {
  try {
    const { empid } = req.params;

    const attendance = await EmpAttendance.find({ empid }).sort({ date: 'asc' });

    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error fetching employee attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  markAttendance,
  getEmployeeAttendance,
};
