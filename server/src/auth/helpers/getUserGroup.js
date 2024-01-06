import { config } from "../../config/config";

export const getUserGroupByName = async (name) => {
  const client = config.dbClient;
  const query = `SELECT * FROM "GROUPS" WHERE name = $1`;

  const res = await client.query(query, [name]);

  return res.rows.length > 0 ? res.rows[0] : undefined;
};
