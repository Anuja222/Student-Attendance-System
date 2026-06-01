"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setToken, setUserId, clearAuth } from "../slices/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const userId = useAppSelector((s) => s.auth.userId);

  const login = useCallback((tok: string, id?: string) => {
    dispatch(setToken(tok));
    if (id) dispatch(setUserId(id));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return { token, userId, login, logout };
}
