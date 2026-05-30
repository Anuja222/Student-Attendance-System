"use client";

import { useEffect, useState } from "react";
import { Section } from "@/api/types/Section";
import {
  getSections,
  createSection,
} from "@/api/service/sectionService";

export default function SectionView() {
  const [sections, setSections] = useState<Section[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const data = await getSections();
      setSections(data);
    } catch (error) {
      console.error("Failed to load sections", error);
    }
  };

  const handleCreateSection = async () => {
    if (!name.trim()) {
      return;
    }

    try {
      await createSection({ name });

      setName("");

      await loadSections();
    } catch (error) {
      console.error("Failed to create section", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Section Management
      </h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Section Name"
          className="border rounded px-3 py-2"
        />

        <button
          onClick={handleCreateSection}
          className="border rounded px-4 py-2"
        >
          Save
        </button>
      </div>

      <div className="space-y-2">
        {sections.length === 0 ? (
          <p>No sections found.</p>
        ) : (
          sections.map((section) => (
            <div
              key={section.id}
              className="border rounded p-3"
            >
              {section.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}