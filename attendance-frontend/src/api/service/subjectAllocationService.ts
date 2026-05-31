import { apiClient } from "../apiClient";
import { SubjectAllocation } from "../types/SubjectAllocation";

export const getSubjectAllocations = async (): Promise<SubjectAllocation[]> => {
  const response = await apiClient.get("/subject-allocations");
  return response.data;
};

export const createSubjectAllocation = async (
  payload: Omit<SubjectAllocation, "id">
): Promise<SubjectAllocation> => {
  const response = await apiClient.post(
    "/subject-allocations",
    payload
  );

  return response.data;
};

export const deleteSubjectAllocation = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`/subject-allocations/${id}`);
};