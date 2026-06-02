"use client";

import { useEffect, useState } from "react";
import { Timetable } from "@/api/types/Timetable";
import { getTimetablesByTeacher } from "@/api/service/timetableService";
import { Student } from "@/api/types/Student";
import { getStudentsByClass } from "@/api/service/studentService";
import { createAttendance } from "@/api/service/attendanceService";
import { useRouter } from "next/navigation";
import { hasRole } from "@/utils/routeGuard";
import { getCurrentUser }from "@/utils/auth";
import {getTeacherByEmail} from "@/api/service/teacherService";
import {getAllocationsByTeacher} from "@/api/service/teacherAllocationService";
import { Teacher }from "@/api/types/Teacher";
import { TeacherAllocation }from "@/api/types/TeacherAllocation";

export default function TeacherDashboardView() {

const [teacher,setTeacher] = useState<Teacher | null>(null);
const [allocations,setAllocations] = useState<TeacherAllocation[]>([]);
const [timetables,setTimetables] = useState<Timetable[]>([]);
const [selectedEntry, setSelectedEntry] = useState<Timetable | null>(null);
const [students, setStudents] = useState<Student[]>([]);
const [attendanceStatus, setAttendanceStatus] = useState<Record<number, string>>({});
const router = useRouter();

useEffect(() => {

  if (!hasRole("TEACHER")) {
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

  const teacherData = await getTeacherByEmail(user.email);
  setTeacher(teacherData);

  const allocationData = await getAllocationsByTeacher(
    teacherData.fullName
  );
  setAllocations(allocationData);

  const timetableData = await getTimetablesByTeacher(
    teacherData.fullName
  );

  const sortedTimetables = [...timetableData].sort((a, b) => {
    if (a.day !== b.day) {
      return a.day.localeCompare(b.day);
    }

    return a.period - b.period;
  });

  setTimetables(sortedTimetables);
};

const openAttendance = async (entry: Timetable) => {
  setSelectedEntry(entry);

  const data = await getStudentsByClass(
    entry.grade,
    entry.section
  );

  setStudents(data);

  const initialStatus: Record<number, string> = {};

  data.forEach((student: Student) => {
    initialStatus[student.id] = "PRESENT";
  });

  setAttendanceStatus(initialStatus);
};

const saveAttendance = async () => {
  if (!selectedEntry) {
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  try {
    for (const student of students) {
      await createAttendance({
        studentNumber: student.studentNumber,
        studentName: student.fullName,
        grade: student.grade,
        section: student.section,
        subject: selectedEntry.subject,
        teacher: selectedEntry.teacher,
        day: selectedEntry.day,
        period: selectedEntry.period,
        date: today,
        status: attendanceStatus[student.id],
      });
    }

    alert("Attendance saved");

    setSelectedEntry(null);
    setStudents([]);
    setAttendanceStatus({});
  } catch (error: unknown) {
    alert("Attendance has already been recorded for this class/period.");
  }
};

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-2">
        Teacher Dashboard
      </h1>

      <p className="mb-6">
        Welcome,
        {" "}
        {teacher?.fullName}
      </p>

      <h2 className="text-xl font-semibold mb-4">
        My Allocations
      </h2>
            <div className="space-y-3">

        {allocations.map(
          (allocation) => (

          <div
            key={allocation.id}
            className="border rounded p-3"
          >
            <div>
              Grade:
              {" "}
              {allocation.grade}
            </div>

            <div>
              Section:
              {" "}
              {allocation.section}
            </div>

            <div>
              Subject:
              {" "}
              {allocation.subject}
            </div>
          </div>

        ))}

      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        My Timetable
      </h2>

        <div className="space-y-3">
        {timetables.length === 0 ? (
            <p>No timetable entries found.</p>
        ) : (
            timetables.map((entry) => (
            <div
                key={entry.id}
                className="border rounded p-3"
            >
                <div>{entry.day}</div>

                <div>
                P{entry.period} | {entry.grade} - {entry.section}
                </div>

                <div>Subject: {entry.subject}</div>

                <button
                onClick={() => openAttendance(entry)}
                className="border rounded px-3 py-1 mt-2"
                >
                Mark Attendance
                </button>

            </div>
            ))
        )}
        </div>

        
        {selectedEntry && (
            <div className="border rounded p-4 mt-8">
            <h2 className="text-xl font-semibold mb-4">
                Mark Attendance
            </h2>

            <p className="mb-4">
                {selectedEntry.day} | P{selectedEntry.period} |{" "}
                {selectedEntry.grade} - {selectedEntry.section} |{" "}
                {selectedEntry.subject}
            </p>

            <div className="space-y-2">
                {students.map((student) => (
                <div
                    key={student.id}
                    className="border rounded p-3 flex justify-between items-center"
                >
                    <div>
                    <div>{student.fullName}</div>
                    <div>{student.studentNumber}</div>
                    </div>

                    <select
                    value={attendanceStatus[student.id]}
                    onChange={(e) =>
                        setAttendanceStatus({
                        ...attendanceStatus,
                        [student.id]: e.target.value,
                        })
                    }
                    className="border rounded p-2"
                    >
                    <option value="PRESENT">
                        Present
                    </option>

                    <option value="ABSENT">
                        Absent
                    </option>
                    </select>
                </div>
                ))}
            </div>

            <button
                onClick={saveAttendance}
                className="border rounded px-4 py-2 mt-4"
            >
                Save Attendance
            </button>
            </div>
        )}
    </div>
  );
}