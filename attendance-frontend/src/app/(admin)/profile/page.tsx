"use client";
import React from "react";
import ProfileView from "./ProfileView";

export default function ProfilePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <ProfileView />
    </main>
  );
}
