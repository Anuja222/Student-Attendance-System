"use client";

import { useEffect, useState } from "react";

import { getCurrentUser }
  from "@/utils/auth";

import {
  getAllocationsByTeacher
} from "@/api/service/teacherAllocationService";

import { TeacherAllocation }
  from "@/api/types/TeacherAllocation";

export default function TeacherDashboardView() {

  const [allocations,
    setAllocations] = useState<
      TeacherAllocation[]
    >([]);

  useEffect(() => {
    loadAllocations();
  }, []);

  const loadAllocations = async () => {

    const user =
      getCurrentUser();

    if (!user) {
      return;
    }

    const data =
      await getAllocationsByTeacher(
        `${user.firstName} ${user.lastName}`
      );

    setAllocations(data);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Teacher Dashboard
      </h1>

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

    </div>
  );
}