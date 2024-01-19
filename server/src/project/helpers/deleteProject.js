import { log } from "../../config/logger";
import { config } from "../../config/config";

const DELETE_PROJECT_QUERY = "DELETE FROM \"PROJECTS\" WHERE id = $1";
const DELETE_PROJECT_PERMISSIONS_QUERY = "DELETE FROM \"PROJECT_PERMISSIONS\" WHERE project_id = $1";

export const deleteProjectById = async (id) => {
  const client = config.dbClient;

  try {
    await client.query(DELETE_PROJECT_PERMISSIONS_QUERY, [id]);
    await client.query(DELETE_PROJECT_QUERY, [id]);
    return true;
  } catch (err) {
    log.error({ err }, "Cannot delete project");
  }

  return false;
};
