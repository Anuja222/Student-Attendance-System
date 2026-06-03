"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/utils/auth";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-between items-center border-b p-4 mb-6">
      <div className="flex gap-4">
        {user.role === "ADMIN" && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/students">Students</Link>
            <Link href="/teachers">Teachers</Link>
            <Link href="/subjects">Subjects</Link>
            <Link href="/grades">Grades</Link>
            <Link href="/sections">Sections</Link>
            <Link href="/timetables">Timetable</Link>
            <Link href="/attendance-reports">Report</Link>

          </>
        )}

        {user.role === "TEACHER" && (
          <Link href="/teacher-dashboard">
            Teacher Dashboard
          </Link>
        )}

        {user.role === "STUDENT" && (
          <Link href="/student-dashboard">
            Student Dashboard
          </Link>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="border rounded px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}