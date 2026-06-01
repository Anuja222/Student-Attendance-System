"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/api/service/authService";

export default function SignInView() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const response = await login({
        email,
        password,
      });

      const user = response.data;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      if (user.role === "ADMIN") {
        router.push("/dashboard");
      } else if (
        user.role === "TEACHER"
      ) {
        router.push(
          "/teacher-dashboard"
        );
      } else if (
        user.role === "STUDENT"
      ) {
        router.push(
          "/student-dashboard"
        );
      } else {
        router.push("/");
      }
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border rounded p-6 w-96">
        <h1 className="text-2xl font-bold mb-4">
          Sign In
        </h1>

        <div className="flex flex-col gap-3">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="border p-2 rounded"
          />

          <button
            onClick={handleLogin}
            className="border rounded p-2"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}