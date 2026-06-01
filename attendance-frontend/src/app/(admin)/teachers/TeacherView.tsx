"use client";

import { useEffect, useState } from "react";

import { Teacher } from "@/api/types/Teacher";
import { Subject } from "@/api/types/Subject";

import {
  getTeachers,
  createTeacher,
  deleteTeacher,
} from "@/api/service/teacherService";

import { getSubjects } from "@/api/service/subjectService";

export default function TeacherView() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [teacherCode, setTeacherCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    loadTeachers();
    loadSubjects();
  }, []);

  const loadTeachers = async () => {
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Failed to load teachers", error);
    }
  };

  const loadSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error("Failed to load subjects", error);
    }
  };

  const handleCreateTeacher = async () => {
    if (
      !teacherCode.trim() ||
      !fullName.trim() ||
      !email.trim() ||
      !subject.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createTeacher({
        teacherCode,
        fullName,
        email,
        subject,
      });

      setTeacherCode("");
      setFullName("");
      setEmail("");
      setSubject("");

      await loadTeachers();
    } catch (error) {
      console.error("Failed to create teacher", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTeacher(id);
      await loadTeachers();
    } catch (error) {
      console.error("Failed to delete teacher", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Teacher Management
      </h1>

      <div className="border rounded-lg p-4 mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add Teacher
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Teacher Code"
            value={teacherCode}
            onChange={(e) =>
              setTeacherCode(e.target.value)
            }
            className="border rounded p-2"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="border rounded p-2"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border rounded p-2"
          />

          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            className="border rounded p-2"
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((subjectItem) => (
              <option
                key={subjectItem.id}
                value={subjectItem.name}
              >
                {subjectItem.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreateTeacher}
            className="border rounded p-2"
          >
            Save Teacher
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Teacher List
        </h2>

        <div className="space-y-2">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="border rounded p-3 flex justify-between items-center"
            >
              <div>
                <div>
                  <strong>
                    {teacher.teacherCode}
                  </strong>
                </div>

                <div>{teacher.fullName}</div>

                <div>{teacher.email}</div>

                <div>
                  Subject: {teacher.subject}
                </div>
              </div>

              <button
                onClick={() =>
                  handleDelete(teacher.id)
                }
                className="border rounded px-3 py-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}