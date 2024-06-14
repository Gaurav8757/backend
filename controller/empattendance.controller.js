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
    res.status(201).json({ message: "Attendance Added Successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const markLeaveAttendance = async (req, res) => {
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
        .json({ message: "Leave already marked for this date" });
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
    res.status(201).json({ message: "Leave Attendance Marked Successfully.....!" });
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


// export const updateEmpAttendance = async (req, res) => {
//   try {
//     const { employee_id } = req.params;
//     const employeeData = req.body;
    
//     // Get the current date in the format dd/mm/yyyy
//     const currentDate = new Date();
//     const day = String(currentDate.getDate()).padStart(2, '0');
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = currentDate.getFullYear();
//     const formattedCurrentDate = `${day}/${month}/${year}`;

//     // Perform the update only if the date matches the current date
//     const updatedEmployeeAttendance = await EmpAttendance.findOneAndUpdate(
//       { employee_id, date: formattedCurrentDate }, // Find the attendance record by employee_id and date
//       { logouttime: employeeData.logouttime }, // Update the logouttime
//       { new: true } // Return the updated record
//     );

//     if (!updatedEmployeeAttendance) {
//       return res.status(404).json({
//         status: "Employee Attendance not found",
//         message: "The specified Employee Attendance does not exist in the database for the current date",
//       });
//     }

//     return res.status(200).json({
//       status: "Employee Attendance Updated Successfully",
//       message: {
//         updatedEmployeeAttendance,
//       },
//     });
//   } catch (err) {
//     console.error("Error during Employee Attendance Update:", err);

//     // Handle Mongoose validation errors
//     if (err.name === 'ValidationError') {
//       return res.status(400).json({
//         status: "Validation Error",
//         message: err.message,
//       });
//     }

//     return res.status(500).json({
//       status: "Internal Server Error",
//       message: err.message,
//     });
//   }
// };


export const updateEmpAttendance = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const employeeData = req.body;
    // Check if the attendance record exists before attempting to update
    const existingEmployeeAttendance = await AddEmployee.findById(employee_id);

    if (!existingEmployeeAttendance) {
      return res.status(404).json({
        status: "Employee Attendance not found",
        message: "The specified Employee Attendance does not exist in the database for the current date",
      });
    }

    // Perform the update
    const updatedEmployeeAttendance = await EmpAttendance.findOneAndUpdate(
      employee_id,
      employeeData,
      {
        new: true,
        runValidators: true, // Optional: Run Mongoose validation
      }
    );

    return res.status(200).json({
      status: "Employee Attendance Updated Successfully",
      message: {
        updatedEmployeeAttendance,
      },
    });
  } catch (err) {
    console.error("Error during Employee Attendance Update:", err);

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: "Validation Error",
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};
