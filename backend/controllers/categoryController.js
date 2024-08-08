import {
  fetchAllCategories,
  fetchCategoryById,
} from "../services/categoryService.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await fetchAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await fetchCategoryById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
