import { useState, useEffect, useCallback } from 'react';
import {
  getSections as fetchSections,
  getSection as fetchSection,
  createSection as createSectionSvc,
  updateSection as updateSectionSvc,
  deleteSection as deleteSectionSvc,
} from './service/sectionService';
import { Section, CreateSectionPayload, UpdateSectionPayload } from './types/Section';

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

  const create = useCallback(async (payload: CreateSectionPayload) => {
    const created = await createSectionSvc(payload);
    setData((prev) => (prev ? [created, ...prev] : [created]));
    return created;
  }, []);

  const update = useCallback(async (id: string, payload: UpdateSectionPayload) => {
    const updated = await updateSectionSvc(id, payload);
    setData((prev) => (prev ? prev.map((s) => (s.id === id ? updated : s)) : [updated]));
    return updated;
  }, []);

  const remove = useCallback(async (id: string) => {
    await deleteSectionSvc(id);
    setData((prev) => (prev ? prev.filter((s) => s.id !== id) : null));
  }, []);

  return { data, isLoading, error, refresh, create, update, remove };
}

export async function fetchSectionById(id: string): Promise<Section> {
  return fetchSection(id);
}
