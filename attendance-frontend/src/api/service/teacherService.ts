import { apiClient } from "../apiClient";
import { Teacher } from "../types/Teacher";

export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await apiClient.get("/teachers");
  return response.data;
};

export const createTeacher = async (
  payload: Omit<Teacher, "id">
): Promise<Teacher> => {
  const response = await apiClient.post("/teachers", payload);
  return response.data;
};

export const deleteTeacher = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`/teachers/${id}`);
};