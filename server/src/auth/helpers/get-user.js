import {config} from "../../config/config";

export const getUserByUsername = async (username) => {
  const client = config.dbClient;
  const query = `SELECT * FROM "USERS" WHERE username = $1`;

  const res = await client.query(query, [username]);

  return res.rows.length > 0 ? mapUser(res.rows[0]) : undefined;
}

const mapUser = (user) => ({
  id: user.id,
  username: user.username,
  password: user.password,
  email: user.e_mail,
  firstName: user.first_name,
  lastName: user.last_name,
  createdAt: user.created_at,
  avatarURL: user.avatar_url
})
