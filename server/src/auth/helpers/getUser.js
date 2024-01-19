import { config } from "../../config/config";

const SELECT_USER_GROUPS = "SELECT * FROM \"GROUPS\" WHERE id in (SELECT group_id from \"USER_GROUPS\" WHERE user_id = $1)";

export const getUserByUsername = async (username) => {
  const client = config.dbClient;
  const query = "SELECT * FROM \"USERS\" WHERE username = $1";

  const res = await client.query(query, [username]);
  const userGroups = res.rows.length > 0 ? await client.query(SELECT_USER_GROUPS, [res.rows[0].id]) : {};

  return res.rows.length > 0 ? mapUser(res.rows[0], userGroups.rows) : undefined;
};

export const getUserByEmail = async (email) => {
  const client = config.dbClient;
  const query = "SELECT * FROM \"USERS\" WHERE e_mail = $1";

  const res = await client.query(query, [email]);

  return res.rows.length > 0 ? mapUser(res.rows[0]) : undefined;
};

const mapUser = (user, userGroups) => ({
  id: user.id,
  username: user.username,
  password: user.password,
  email: user.e_mail,
  firstName: user.first_name,
  lastName: user.last_name,
  createdAt: user.created_at,
  avatarURL: user.avatar_url,
  userGroups: userGroups && userGroups.length > 0 ? userGroups.map(mapUserGroup) : undefined,
});

const mapUserGroup = (userGroup) => ({
  id: userGroup.id,
  name: userGroup.name,
  permissions: userGroup.permissions,
});
