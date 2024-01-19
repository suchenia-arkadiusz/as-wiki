import { config } from "../../config/config";
import { log } from "../../config/logger";
import { getUserByUsername } from "./getUser";

export const deleteUserByUserName = async (username) => {
  const client = config.dbClient;
  const user = await getUserByUsername(username);
  const query = "DELETE FROM \"USERS\" WHERE username = $1";
  const deleteFromUserGroupsQuery = "DELETE FROM \"USER_GROUPS\" WHERE user_id = $1";

  try {
    await client.query(deleteFromUserGroupsQuery, [user.id]);
    await client.query(query, [username]);
    return true;
  } catch (err) {
    log.error({ err }, "Cannot delete user");
  }

  return false;
};
