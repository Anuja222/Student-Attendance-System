"use client";

import { useCallback, useState } from "react";

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  const set = useCallback((nextValue: boolean) => {
    setValue(nextValue);
  }, []);

  return { value, set, toggle };
}