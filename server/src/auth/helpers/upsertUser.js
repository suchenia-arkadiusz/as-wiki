import { config } from "../../config/config";
import { v4 as uuidv4 } from "uuid";
import { getUserGroupByName } from "./getUserGroup";
import { log } from "../../config/logger";

export const createUser = async (user, userGroup) => {
  const client = config.dbClient;
  const query = "INSERT INTO \"USERS\"(id, username, password, e_mail, first_name, last_name, created_at, avatar_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
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

  const foundUserGroup = await getUserGroupByName(userGroup || "USER");

  if (!foundUserGroup) {
    log.error({ userGroup }, "Cannot find user group");
    return undefined;
  }

  const assignUserGroupQuery = "INSERT INTO \"USER_GROUPS\" (user_id, group_id) VALUES($1, $2)";
  const assignUserGroupValues = [values[0], foundUserGroup.id];

  const res = await client.query(query, values);
  await client.query(assignUserGroupQuery, assignUserGroupValues);

  return { ...res.rows[0], userGroups: [{ id: foundUserGroup.id, name: foundUserGroup.name, permissions: foundUserGroup.permissions }] };
};
