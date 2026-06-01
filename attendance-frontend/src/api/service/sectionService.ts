import {apiClient} from "../apiClient";
import { Section } from "../types/Section";

export const getSections = async (): Promise<Section[]> => {
  const response = await apiClient.get("/sections");
  return response.data;
};

export const createSection = async (
  payload: { name: string }
): Promise<Section> => {
  const response = await apiClient.post("/sections", payload);
  return response.data;
};