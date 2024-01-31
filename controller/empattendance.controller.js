// attendance.controller.js
import EmpAttendance from "../models/empattendanceSchema.js";
import AddEmployee from "../models/addempSchema.js";

// get current date time
// const getCurrentDateAndTime = () => {
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
//   const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
//   return formattedDate;
// };
// const currentDateTime = getCurrentDateAndTime();
// // markEmployeeAttendance
export const markAttendance = async (req, res) => {
    const { employeeId } = req.params;
    const { status, currentDateTime } = req.body;
    try {
      // Fetch employee information by _id
      const employee = await AddEmployee.findById(employeeId);

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      // Create attendance record with the current date and time
      const attendanceRecord = new EmpAttendance({
        employee_id: employee._id,
        empname: employee.empname,
        date: currentDateTime,
        status: status,
      });

      // Save the attendance record
      await attendanceRecord.save();

      res.status(201).json({ message: 'Attendance added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
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






