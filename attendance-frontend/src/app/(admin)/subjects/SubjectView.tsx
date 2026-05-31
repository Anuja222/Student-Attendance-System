"use client";

import { useEffect, useState } from "react";

import { Subject } from "@/api/types/Subject";

import {
  getSubjects,
  createSubject,
  deleteSubject,
} from "@/api/service/subjectService";

export default function SubjectView() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error("Failed to load subjects", error);
    }
  };

  const handleCreateSubject = async () => {
    if (!code.trim() || !name.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createSubject({
        code,
        name,
      });

      setCode("");
      setName("");

      await loadSubjects();
    } catch (error) {
      console.error("Failed to create subject", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubject(id);
      await loadSubjects();
    } catch (error) {
      console.error("Failed to delete subject", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Subject Management
      </h1>

      <div className="border rounded-lg p-4 mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add Subject
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Subject Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border rounded p-2"
          />

          <input
            type="text"
            placeholder="Subject Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2"
          />

          <button
            onClick={handleCreateSubject}
            className="border rounded p-2"
          >
            Save Subject
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Subject List
        </h2>

        <div className="space-y-2">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="border rounded p-3 flex justify-between items-center"
            >
              <div>
                <div>
                  <strong>{subject.code}</strong>
                </div>

                <div>{subject.name}</div>
              </div>

              <button
                onClick={() =>
                  handleDelete(subject.id)
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