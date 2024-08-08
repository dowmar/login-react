import {
  getAllFoods,
  getFoodById,
  getFoodsByCategory,
} from "../models/food.js";

export const fetchAllFoods = async () => {
  return await getAllFoods();
};

export const fetchFoodById = async (id) => {
  return await getFoodById(id);
};

export const fetchFoodsByCategory = async (categoryId) => {
  return await getFoodsByCategory(categoryId);
};
