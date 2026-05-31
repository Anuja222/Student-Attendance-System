import { apiClient } from "../apiClient";
import { Grade } from "../types/Grade";

export const getGrades = async (): Promise<Grade[]> => {
  const response = await apiClient.get("/grades");
  return response.data;
};

export const createGrade = async (
  payload: Omit<Grade, "id">
): Promise<Grade> => {
  const response = await apiClient.post("/grades", payload);
  return response.data;
};

export const deleteGrade = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`/grades/${id}`);
};