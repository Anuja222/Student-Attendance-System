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

export const getStudentsByClass = async (
  grade: string,
  section: string
) => {
  const response = await apiClient.get("/students/class", {
    params: {
      grade,
      section,
    },
  });

  return response.data;
};

export const getStudentByEmail = async (email: string) => {
  const response = await apiClient.get("/students/by-email", {
    params: {
      email,
    },
  });

  return response.data;
};