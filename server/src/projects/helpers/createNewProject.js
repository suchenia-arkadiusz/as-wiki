import { config } from "../../config/config";
import { v4 as uuidv4 } from "uuid";
import { log } from "../../config/logger";

const INSERT_PROJECT_QUERY = `INSERT INTO "PROJECTS"
    (id, name, description, created_at, created_by, updated_at, updated_by, version, is_public, logo_url)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`;

const INSERT_PROJECT_PERMISSIONS_QUERY = `INSERT INTO "PROJECT_PERMISSIONS" (project_id, user_id, group_id) VALUES ($1, $2, $3)`;

export const createNewProject = async (project, userId) => {
  const client = config.dbClient;
  const insertProjectValues = [
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
    const res = await client.query(INSERT_PROJECT_QUERY, insertProjectValues);
    await createNewProjectPermissions(project.permissions, client, insertProjectValues[0]);

    return res.rows[0];
  } catch (error) {
    log.error({ error }, "Cannot create project");
    return undefined;
  }
};

const createNewProjectPermissions = async (permissions, client, projectId) => {
  if (!permissions) return;

  const users = permissions.users;
  const groups = permissions.groups;

  if (users && users.length > 0) for (const user of users) await client.query(INSERT_PROJECT_PERMISSIONS_QUERY, [projectId, user, null]);

  if (groups && groups.length > 0)
    for (const group of groups) await client.query(INSERT_PROJECT_PERMISSIONS_QUERY, [projectId, null, group]);
};
