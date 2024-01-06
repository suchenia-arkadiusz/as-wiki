import { log } from "../../config/logger";
import { config } from "../../config/config";

export const deleteProjectById = async (id) => {
  const client = config.dbClient;
  const query = `DELETE FROM "PROJECTS" WHERE id = $1`;

  try {
    await client.query(query, [id]);
    return true;
  } catch (err) {
    log.error({ err }, "Cannot delete project");
  }

  return false;
};
