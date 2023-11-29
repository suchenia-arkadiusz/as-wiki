import { log } from "../../config/logger";
import { config } from "../../config/config";
import { getProjectById } from "./getProjectById";

export const updateExistingProject = async (project, projectId, userId) => {
  const client = config.dbClient;
  const existingProject = await getProjectById(projectId);
  const updatedProject = {
    ...existingProject,
    ...project,
  };
  const query = `UPDATE "PROJECTS"
    SET name = $1, description = $2, updated_at = $3, updated_by = $4, version = $5, is_public = $6, logo_url = $7
    WHERE id = $8
    RETURNING *`;
  const values = [
    updatedProject.name,
    updatedProject.description,
    new Date().toISOString(),
    userId,
    updatedProject.version + 1,
    updatedProject.isPublic == null ? false : updatedProject.isPublic,
    updatedProject.logoUrl == null ? null : updatedProject.logoUrl,
    projectId,
  ];

  try {
    const res = await client.query(query, values);

    return res.rows[0];
  } catch (error) {
    log.error({ error }, "Cannot update project");
    return undefined;
  }
};
