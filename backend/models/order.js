import pool from "../config/db.js";

export const fetchOrder = async () => {
  const result = await pool.query("SELECT * FROM orders");
  return result.rows;
};

export const createOrder = async (orders, tableNumber) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText =
      "INSERT INTO orders (itemid, name, price, quantity, total_price, table_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const createdOrders = [];
    for (const order of orders) {
      const { id, name, price, quantity, total_price } = order;
      const result = await client.query(queryText, [
        id,
        name,
        price,
        quantity,
        total_price,
        tableNumber,
      ]);
      createdOrders.push(result.rows[0]);
    }
    await client.query("COMMIT");
    return createdOrders;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
