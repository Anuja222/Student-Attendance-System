import { apiClient } from "../apiClient";
import { Attendance } from "../types/Attendance";

export const getAttendance = async (): Promise<Attendance[]> => {
  const response = await apiClient.get("/attendance");
  return response.data;
};

export const createAttendance = async (
  payload: Omit<Attendance, "id">
): Promise<Attendance> => {
  const response = await apiClient.post(
    "/attendance",
    payload
  );

  return response.data;
};

export const deleteAttendance = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`/attendance/${id}`);
};

export const getAttendanceByStudent =
  async (studentNumber: string) => {
    const response = await apiClient.get(
      `/attendance/student/${studentNumber}`
    );

    return response.data;
  };