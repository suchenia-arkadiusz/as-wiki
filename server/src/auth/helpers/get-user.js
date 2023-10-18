import {config} from "../../config/config";

export const getUserByUsername = async (username) => {
  const client = config.dbClient;
  const query = `SELECT * FROM "USERS" WHERE username = $1`;

  const res = await client.query(query, [username]);

  return res.rows.length > 0 ? res.rows[0] : undefined;
}
