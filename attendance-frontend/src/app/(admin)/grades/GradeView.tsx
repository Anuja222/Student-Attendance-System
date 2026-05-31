"use client";

import { useEffect, useState } from "react";

import { Grade } from "@/api/types/Grade";

import {
  getGrades,
  createGrade,
  deleteGrade,
} from "@/api/service/gradeService";

export default function GradeView() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const data = await getGrades();
      setGrades(data);
    } catch (error) {
      console.error("Failed to load grades", error);
    }
  };

  const handleCreateGrade = async () => {
    if (!name.trim()) {
      alert("Please enter a grade name");
      return;
    }

    try {
      await createGrade({
        name,
      });

      setName("");

      await loadGrades();
    } catch (error) {
      console.error("Failed to create grade", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteGrade(id);
      await loadGrades();
    } catch (error) {
      console.error("Failed to delete grade", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Grade Management
      </h1>

      <div className="border rounded-lg p-4 mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add Grade
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Grade Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2"
          />

          <button
            onClick={handleCreateGrade}
            className="border rounded p-2"
          >
            Save Grade
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Grade List
        </h2>

        <div className="space-y-2">
          {grades.length === 0 ? (
            <p>No grades found.</p>
          ) : (
            grades.map((grade) => (
              <div
                key={grade.id}
                className="border rounded p-3 flex justify-between items-center"
              >
                <div>
                  <strong>{grade.name}</strong>
                </div>

                <button
                  onClick={() => handleDelete(grade.id)}
                  className="border rounded px-3 py-1"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}