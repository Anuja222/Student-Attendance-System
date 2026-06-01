"use client";

import { useEffect, useState } from "react";
import { Timetable } from "@/api/types/Timetable";
import { getTimetablesByTeacher } from "@/api/service/timetableService";

import { getCurrentUser }
  from "@/utils/auth";

import {
  getTeacherByEmail
} from "@/api/service/teacherService";

import {
  getAllocationsByTeacher
} from "@/api/service/teacherAllocationService";

import { Teacher }
  from "@/api/types/Teacher";

import { TeacherAllocation }
  from "@/api/types/TeacherAllocation";

export default function TeacherDashboardView() {

const [teacher,
    setTeacher] =
    useState<Teacher | null>(null);

const [allocations,
    setAllocations] =
    useState<TeacherAllocation[]>([]);

const [timetables,
    setTimetables] = useState<Timetable[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    const user =
      getCurrentUser();

    if (!user) {
      return;
    }

    const teacherData =
      await getTeacherByEmail(
        user.email
      );

    setTeacher(teacherData);

    const allocationData =
      await getAllocationsByTeacher(
        teacherData.fullName
      );

    setAllocations(
      allocationData
    );

    const timetableData = await getTimetablesByTeacher(teacherData.fullName);

    const sortedTimetables = [...timetableData].sort((a, b) => {
    if (a.day !== b.day) {
        return a.day.localeCompare(b.day);
    }

    return a.period - b.period;
    });

    setTimetables(sortedTimetables);
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
            </div>
            ))
        )}
        </div>
    </div>
  );
}