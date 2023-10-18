import {config} from "../../config/config";
import { v4 as uuidv4 } from "uuid";

export const insertAuthToken = async ({userId, token, refreshToken}) => {
  const client = config.dbClient;
  const query = `INSERT INTO "AUTH"(id, user_id, token, refresh_token) VALUES($1, $2, $3, $4)`;
  const values = [uuidv4(), userId, token, refreshToken];

  const res = await client.query(query, values);

  return res.rows[0];
}
