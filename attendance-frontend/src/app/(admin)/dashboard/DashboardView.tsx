"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasRole } from "@/utils/routeGuard";
import Navbar from "@/components/Navbar";

import {
  getStudentCount,
  getTeacherCount,
  getSubjectCount,
  getAttendanceCount,
} from "@/api/service/dashboardService";

export default function DashboardView() {

  const router = useRouter();

  const [studentCount, setStudentCount] =
    useState(0);

  const [teacherCount, setTeacherCount] =
    useState(0);

  const [subjectCount, setSubjectCount] =
    useState(0);

  const [attendanceCount, setAttendanceCount] =
    useState(0);

useEffect(() => {

  if (!hasRole("ADMIN")) {
    router.push("/signin");
    return;
  }

  loadDashboard();

}, []);

  const loadDashboard = async () => {
    setStudentCount(
      await getStudentCount()
    );

    setTeacherCount(
      await getTeacherCount()
    );

    setSubjectCount(
      await getSubjectCount()
    );

    setAttendanceCount(
      await getAttendanceCount()
    );
  };

  return (
  <div>
    <Navbar />  
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="border rounded p-6">
          <h2 className="text-lg font-semibold">
            Students
          </h2>

          <p className="text-4xl mt-2">
            {studentCount}
          </p>
        </div>

        <div className="border rounded p-6">
          <h2 className="text-lg font-semibold">
            Teachers
          </h2>

          <p className="text-4xl mt-2">
            {teacherCount}
          </p>
        </div>

        <div className="border rounded p-6">
          <h2 className="text-lg font-semibold">
            Subjects
          </h2>

          <p className="text-4xl mt-2">
            {subjectCount}
          </p>
        </div>

        <div className="border rounded p-6">
          <h2 className="text-lg font-semibold">
            Attendance Records
          </h2>

          <p className="text-4xl mt-2">
            {attendanceCount}
          </p>
        </div>

      </div>
    </div>
  </div>
  );
}