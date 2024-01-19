import { config } from "../../config/config";

export const getAllUserGroups = async () => {
  const client = config.dbClient;
  const query = "SELECT * FROM \"GROUPS\"";

  return (await client.query(query)).rows;
};
