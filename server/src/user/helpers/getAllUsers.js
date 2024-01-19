import { config } from "../../config/config";

export const getAllUsers = async () => {
  const client = config.dbClient;
  const query = "SELECT * FROM \"USERS\"";

  return (await client.query(query)).rows;
};
