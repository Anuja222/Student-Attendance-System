import { apiClient } from "../apiClient";
import { Subject } from "../types/Subject";

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await apiClient.get("/subjects");
  return response.data;
};

export const createSubject = async (
  payload: Omit<Subject, "id">
): Promise<Subject> => {
  const response = await apiClient.post("/subjects", payload);
  return response.data;
};

export const deleteSubject = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`/subjects/${id}`);
};