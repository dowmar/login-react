import pool from "../config/db.js";

export const getAllFoods = async () => {
  const result = await pool.query("SELECT * FROM food");
  return result.rows;
};

export const getFoodById = async (id) => {
  const result = await pool.query("SELECT * FROM food WHERE id = $1", [id]);
  return result.rows[0];
};

export const getFoodsByCategory = async (categoryId) => {
  const result = await pool.query("SELECT * FROM food WHERE itemId = $1", [
    categoryId,
  ]);
  return result.rows;
};
