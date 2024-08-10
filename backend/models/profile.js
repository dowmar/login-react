import pool from "../config/db.js";

export const updateProfileName = async (name, email) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "UPDATE users SET name = $1 WHERE email = $2 RETURNING *",
      [name, email]
    );
    await client.query("COMMIT");
    return result.rowCount;
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};
export const updateProfilePassword = async (email, new_pwd) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query(
      "UPDATE users SET pwd = $1 WHERE email = $2 RETURNING *",
      [new_pwd, email]
    );
    await client.query("COMMIT");
    return result.rowCount;
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};
