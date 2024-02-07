// attendance.controller.js
import EmpAttendance from "../models/empattendanceSchema.js";
import AddEmployee from "../models/addempSchema.js";


export const markAttendance = async (req, res) => {
  const { employeeId } = req.params;
  const { status, date, time, weekday } = req.body;
  try {
    // Fetch employee information by _id
    const employee = await AddEmployee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if attendance already marked for the given date
    const existingAttendance = await EmpAttendance.findOne({
      employee_id: employee._id,
      date,
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for this date" });
    }

    // Create attendance record with the current date and time
    const attendanceRecord = new EmpAttendance({
      employee_id: employee._id,
      empname: employee.empname,
      date: date,
      time: time,
      weekday: weekday,
      status: status,
    });

    // Save the attendance record
    await attendanceRecord.save();
    res.status(201).json({ message: "Attendance added successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// getEmployeeAttendance
export const getEmployeeAttendance = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const attendance = await EmpAttendance.find({ employee_id });
    res.status(200).json(attendance);
  } catch (error) {
    console.error("Error fetching employee attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
