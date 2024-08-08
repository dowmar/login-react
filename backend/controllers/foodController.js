import {
  fetchAllFoods,
  fetchFoodById,
  fetchFoodsByCategory,
} from "../services/foodService.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await fetchAllFoods();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await fetchFoodById(id);
    if (!food) {
      res.status(404).json({ message: "Food not found" });
    } else {
      res.status(200).json(food);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFoodsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const foods = await fetchFoodsByCategory(categoryId);
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
