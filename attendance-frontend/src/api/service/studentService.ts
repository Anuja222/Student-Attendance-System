import { apiClient } from "../apiClient";
import { Student } from "../types/Student";

export const getStudents = async (): Promise<Student[]> => {
  const response = await apiClient.get("/students");
  return response.data;
};

export const createStudent = async (
  payload: Omit<Student, "id">
): Promise<Student> => {
  const response = await apiClient.post("/students", payload);
  return response.data;
};

export const getStudentsBySection = async (
  section: string
): Promise<Student[]> => {
  const response = await apiClient.get(
    `/students/section/${section}`
  );
  return response.data;
};