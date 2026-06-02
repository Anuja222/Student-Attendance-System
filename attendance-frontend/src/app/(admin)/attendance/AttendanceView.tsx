"use client";

import { useEffect, useState } from "react";

import { Attendance } from "@/api/types/Attendance";
import { Student } from "@/api/types/Student";

import { getStudents } from "@/api/service/studentService";

import {
  getAttendance,
  createAttendance,
  deleteAttendance,
} from "@/api/service/attendanceService";

export default function AttendanceView() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  useEffect(() => {
    loadStudents();
    loadAttendance();
  }, []);

  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const loadAttendance = async () => {
    const data = await getAttendance();
    setAttendanceList(data);
  };

  const handleStudentChange = (
    studentId: string
  ) => {
    const student = students.find(
      (s) => s.id === Number(studentId)
    );

    setSelectedStudent(student || null);
  };

  const handleMarkAttendance = async () => {
    if (!selectedStudent) {
      alert("Select a student");
      return;
    }

    const today = new Date();

    await createAttendance({
      studentNumber:
        selectedStudent.studentNumber,
      studentName:
        selectedStudent.fullName,
      grade: selectedStudent.grade,
      section: selectedStudent.section,
      subject: "Manual Entry",
      teacher: "Manual Entry",
      day: today.toLocaleDateString("en-US", {
        weekday: "long",
      }),
      period: 1,
      date: today.toISOString().split("T")[0],
      status: "PRESENT",
    });

    await loadAttendance();
  };

  const handleDelete = async (id: number) => {
    await deleteAttendance(id);
    await loadAttendance();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Attendance Management
      </h1>

      <div className="border rounded p-4 mb-6 max-w-lg">
        <h2 className="font-semibold mb-4">
          Mark Attendance
        </h2>

        <select
          className="border rounded p-2 w-full mb-3"
          onChange={(e) =>
            handleStudentChange(e.target.value)
          }
        >
          <option value="">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
            >
              {student.fullName}
            </option>
          ))}
        </select>

        <button
          onClick={handleMarkAttendance}
          className="border rounded px-4 py-2"
        >
          Mark Present
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Attendance Records
      </h2>

      <div className="space-y-2">
        {attendanceList.map((record) => (
          <div
            key={record.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">
                {record.studentName}
              </div>

              <div>
                {record.grade} - {record.section}
              </div>

              <div>
                Subject: {record.subject}
              </div>

              <div>
                Teacher: {record.teacher}
              </div>

              <div>
                {record.day} | P{record.period}
              </div>

              <div>
                Date: {record.date}
              </div>

              <div>
                Status: {record.status}
              </div>
            </div>

            <button
              onClick={() =>
                handleDelete(record.id)
              }
              className="border rounded px-3 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}