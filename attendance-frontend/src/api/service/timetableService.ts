import { apiClient } from "../apiClient";
import { Timetable } from "../types/Timetable";

export const getTimetables = async (): Promise<Timetable[]> => {
  const response = await apiClient.get("/timetables");
  return response.data;
};

export const createTimetable = async (
  payload: Omit<Timetable, "id">
): Promise<Timetable> => {
  const response = await apiClient.post(
    "/timetables",
    payload
  );

  return response.data;
};

export const deleteTimetable = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`/timetables/${id}`);
};