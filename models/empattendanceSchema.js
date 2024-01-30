// attendance.model.js
import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
  {
    empid: {
      type: String,
      ref: 'AddEmployee',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'halfday', 'holiday'],
      required: true,
    },
  },
  { timestamps: true }
);

const EmpAttendance = mongoose.model('EmpAttendance', AttendanceSchema);

export default EmpAttendance;
