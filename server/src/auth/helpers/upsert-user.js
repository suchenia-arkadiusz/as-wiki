import { config } from "../../config/config";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (user) => {
  const client = config.dbClient;
  const query = `INSERT INTO "USERS"(id, username, password, e_mail, first_name, last_name, created_at, avatar_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const values = [
    uuidv4(),
    user.username,
    user.password,
    user.email,
    user.firstName,
    user.lastName,
    new Date().toISOString(),
    user.avatarURL,
  ];

  const res = await client.query(query, values);

  return res.rows[0];
};
