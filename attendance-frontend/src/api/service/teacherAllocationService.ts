import { apiClient } from "../apiClient";
import { TeacherAllocation } from "../types/TeacherAllocation";

export const getTeacherAllocations = async (): Promise<TeacherAllocation[]> => {
  const response = await apiClient.get("/teacher-allocations");
  return response.data;
};

export const createTeacherAllocation = async (
  payload: Omit<TeacherAllocation, "id">
): Promise<TeacherAllocation> => {
  const response = await apiClient.post(
    "/teacher-allocations",
    payload
  );

  return response.data;
};

export const deleteTeacherAllocation = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`/teacher-allocations/${id}`);
};

export const getAllocationsByTeacher =
  async (teacher: string) => {

    const response =
      await apiClient.get(
        `/teacher-allocations/teacher/${teacher}`
      );

    return response.data;
};