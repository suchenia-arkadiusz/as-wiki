import { log } from "../../config/logger";
import { config } from "../../config/config";

export const getAllProjects = async () => {
  const client = config.dbClient;
  const query = "SELECT * FROM \"PROJECTS\"";

  try {
    const res = await client.query(query);

    return res.rows;
  } catch (error) {
    log.error({ error }, "Cannot get projects");
    return undefined;
  }
};
