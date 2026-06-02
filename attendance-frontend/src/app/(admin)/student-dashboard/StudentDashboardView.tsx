"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/auth";
import { Student } from "@/api/types/Student";
import { Attendance } from "@/api/types/Attendance";
import { getStudentByEmail } from "@/api/service/studentService";
import { getAttendanceByStudent } from "@/api/service/attendanceService";
import { useRouter } from "next/navigation";
import { hasRole } from "@/utils/routeGuard";
import { logout } from "@/utils/auth";
import Navbar from "@/components/Navbar";

export default function StudentDashboardView() {
  const [student, setStudent] = useState<Student | null>(null);
  const [records, setRecords] = useState<Attendance[]>([]);
  const router = useRouter();

 useEffect(() => {

  if (!hasRole("STUDENT")) {
    router.push("/signin");
    return;
  }

  loadData();

}, []);

const loadData = async () => {
    const user = getCurrentUser();

    if (!user) {
      return;
    }

    const studentData = await getStudentByEmail(user.email);
    setStudent(studentData);

    const attendanceData = await getAttendanceByStudent(
      studentData.studentNumber
    );

    setRecords(attendanceData);
};

const total = records.length;

const present = records.filter(
    (record) => record.status === "PRESENT"
).length;

const absent = records.filter(
    (record) => record.status === "ABSENT"
).length;

const handleLogout = () => {
    logout();
    router.push("/signin");
};

const percentage =
    total === 0 ? 0 : ((present / total) * 100).toFixed(2);

  return (
  <div>
    <Navbar />  
 
    
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">
            Student Dashboard
        </h1>

        <button
            onClick={handleLogout}
            className="border rounded px-4 py-2"
        >
            Logout
        </button>
        </div>

      <p className="mb-6">
        Welcome, {student?.fullName}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border rounded p-4">
          <p>Total</p>
          <p className="text-3xl">{total}</p>
        </div>

        <div className="border rounded p-4">
          <p>Present</p>
          <p className="text-3xl">{present}</p>
        </div>

        <div className="border rounded p-4">
          <p>Absent</p>
          <p className="text-3xl">{absent}</p>
        </div>

        <div className="border rounded p-4">
          <p>Percentage</p>
          <p className="text-3xl">{percentage}%</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Recent Attendance
      </h2>

      <div className="space-y-2">
        {records.map((record) => (
          <div
            key={record.id}
            className="border rounded p-3"
          >
            <div>
              {record.date} | {record.day} | P{record.period}
            </div>

            <div>Subject: {record.subject}</div>

            <div>Teacher: {record.teacher}</div>

            <div>Status: {record.status}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}