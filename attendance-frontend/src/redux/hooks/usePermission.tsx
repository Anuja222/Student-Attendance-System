"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setPermission } from "../slices/permissionSlice";

export function usePermission() {
  const dispatch = useAppDispatch();
  const granted = useAppSelector((s) => s.permission.granted);

  const set = useCallback((key: string, value: boolean) => {
    dispatch(setPermission({ key, value }));
  }, [dispatch]);

  const isGranted = useCallback((key: string) => !!granted[key], [granted]);

  return { granted, set, isGranted };
}
