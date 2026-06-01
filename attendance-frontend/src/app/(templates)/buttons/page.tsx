"use client";
import React from "react";

export default function ButtonsTemplate() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Buttons</h1>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Primary</button>
        <button className="px-4 py-2 border rounded">Secondary</button>
      </div>
    </div>
  );
}
