// attendance.controller.js
import EmpAttendance from "../models/empattendanceSchema.js";
import AddEmployee from "../models/addempSchema.js";
// markEmployeeAttendance
export const markAttendance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    // Validate the status
    if (status !== 'present' && status !== 'absent') {
      throw new Error('Invalid attendance status');
    }

    // Create a new attendance record
    const attendance = new Attendance({
      userId,
      status
    });

    // Save the attendance record to MongoDB
    await attendance.save();

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Failed to mark attendance:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
}



// getEmployeeAttendance
export const getEmployeeAttendance = async (req, res) => {
  try {
    const { empid } = req.params;

    const attendance = await EmpAttendance.find({ empid }).sort({ date: 'asc' });

    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error fetching employee attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


