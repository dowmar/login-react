import pool from "../config/db.js";

export const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM category");
  return result.rows;
};

export const getCategoryById = async (id) => {
  const result = await pool.query("SELECT * FROM category WHERE id = $1", [id]);
  return result.rows[0];
};
