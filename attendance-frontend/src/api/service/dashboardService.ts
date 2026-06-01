import { apiClient } from "../apiClient";

export const getStudentCount = async () => {
  const response = await apiClient.get(
    "/students/count"
  );

  return response.data;
};

export const getTeacherCount = async () => {
  const response = await apiClient.get(
    "/teachers/count"
  );

  return response.data;
};

export const getSubjectCount = async () => {
  const response = await apiClient.get(
    "/subjects/count"
  );

  return response.data;
};

export const getAttendanceCount = async () => {
  const response = await apiClient.get(
    "/attendance/count"
  );

  return response.data;
};