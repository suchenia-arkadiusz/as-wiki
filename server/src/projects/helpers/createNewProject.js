import { config } from "../../config/config";
import { v4 as uuidv4 } from "uuid";
import { log } from "../../config/logger";

export const createNewProject = async (project, userId) => {
  const client = config.dbClient;
  const query = `INSERT INTO "PROJECTS"
    (id, name, description, created_at, created_by, updated_at, updated_by, version, is_public, logo_url)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`;
  const values = [
    uuidv4(),
    project.name,
    project.description,
    new Date().toISOString(),
    userId,
    new Date().toISOString(),
    userId,
    1,
    project.isPublic == null ? false : project.isPublic,
    project.logoUrl == null ? null : project.logoUrl,
  ];

  try {
    const res = await client.query(query, values);

    return res.rows[0];
  } catch (error) {
    log.error({ error }, "Cannot create project");
    return undefined;
  }
};
