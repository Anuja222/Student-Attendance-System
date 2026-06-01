import { useState, useEffect, useCallback } from 'react';
import {
  getSections as fetchSections,
  createSection as createSectionSvc,
} from './service/sectionService';
import { Section } from './types/Section';

export function useSections() {
  const [data, setData] = useState<Section[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const sections = await fetchSections();
      setData(sections);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(() => {
    load();
  }, [load]);

  const create = useCallback(async (payload: { name: string }) => {
    const created = await createSectionSvc(payload);
    setData((prev) => (prev ? [created, ...prev] : [created]));
    return created;
  }, []);

  return { data, isLoading, error, refresh, create };
}

