import { getAllCategories, getCategoryById } from "../models/category.js";

export const fetchAllCategories = async () => {
  return await getAllCategories();
};

export const fetchCategoryById = async (id) => {
  return await getCategoryById(id);
};
