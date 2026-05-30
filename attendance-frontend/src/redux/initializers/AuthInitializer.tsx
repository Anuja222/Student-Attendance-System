"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { setToken } from "../slices/authSlice";

export function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Example: read token from localStorage and restore into redux
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) dispatch(setToken(token));
  }, [dispatch]);

  return null;
}
