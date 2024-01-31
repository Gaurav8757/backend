// attendance.controller.js
import EmpAttendance from "../models/empattendanceSchema.js";
import AddEmployee from "../models/addempSchema.js";
// markEmployeeAttendance
export const markAttendance = async (req, res) => {
  try {
    const employeeId = req.params._id;
console.log(employeeId);
    try {
      // Fetch employee information by _id
      const employee = await AddEmployee.findById(employeeId);
console.log(employee);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      // Check authentication and permissions (implement your logic)
      // Here, assuming req.user_id is the logged-in user's ID

      // Create attendance record
      const attendanceRecord = new EmpAttendance({
        employee_id: employee._id,
        date: new Date(),
        status: 'Present',
        // other attendance details
      });

      // Save the attendance record
      await attendanceRecord.save();

      res.status(201).json({ message: 'Attendance added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

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


