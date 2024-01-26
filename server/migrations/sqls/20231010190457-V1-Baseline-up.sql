CREATE TABLE "GROUPS" (
    "id" uuid PRIMARY KEY,
    "name" VARCHAR(50) UNIQUE NOT NULL,
    "version" INTEGER DEFAULT 1,
    "permissions" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "created_by" uuid,
    "updated_at" TIMESTAMP NOT NULL,
    "updated_by" uuid,
    CONSTRAINT fk_group_created_by FOREIGN KEY(created_by) REFERENCES "USERS"(id),
    CONSTRAINT fk_group_updated_by FOREIGN KEY(updated_by) REFERENCES "USERS"(id)
);

CREATE TABLE "USER_GROUPS" (
    "user_id" uuid NOT NULL,
    "group_id" uuid NOT NULL,
    CONSTRAINT fk_user_group_user_id FOREIGN KEY(user_id) REFERENCES "USERS"(id),
    CONSTRAINT fk_user_group_group_id FOREIGN KEY(group_id) REFERENCES "GROUPS"(id)
);

CREATE TABLE "PROJECTS" (
    "id" uuid PRIMARY KEY,
    "name" VARCHAR(50) UNIQUE NOT NULL,
    "created_by" uuid NOT NULL,
    "created_at" timestamp NOT NULL,
    "updated_by" uuid,
    "updated_at" TIMESTAMP,
    "description" text,
    "version" INTEGER DEFAULT 1,
    "is_public" BOOLEAN DEFAULT false,
    "logo_url" text,
    CONSTRAINT fk_project_created_by FOREIGN KEY(created_by) REFERENCES "USERS"(id),
    CONSTRAINT fk_project_updated_by FOREIGN KEY(updated_by) REFERENCES "USERS"(id)
);

CREATE TABLE "PROJECT_PERMISSIONS" (
    "project_id" uuid NOT NULL,
    "user_id" uuid,
    "group_id" uuid,
    CONSTRAINT fk_project_permissions_project_id FOREIGN KEY(project_id) REFERENCES "PROJECTS"(id),
    CONSTRAINT fk_project_permissions_user_id FOREIGN KEY(user_id) REFERENCES "USERS"(id),
    CONSTRAINT fk_project_permissions_group_id FOREIGN KEY(group_id) REFERENCES "GROUPS"(id)
);

CREATE TABLE "PAGES" (
    "id" uuid PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "created_by" uuid NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_by" uuid,
    "updated_at" TIMESTAMP,
    "is_public" BOOLEAN,
    "version" INTEGER DEFAULT 1,
    "project_id" uuid NOT NULL,
    "parent_id" uuid,
    CONSTRAINT fk_page_created_by FOREIGN KEY(created_by) REFERENCES "USERS"(id),
    CONSTRAINT fk_page_updated_by FOREIGN KEY(updated_by) REFERENCES "USERS"(id),
    CONSTRAINT fk_page_space_id FOREIGN KEY(project_id) REFERENCES "PROJECTS"(id),
    CONSTRAINT fk_page_parent_id FOREIGN KEY(parent_id) REFERENCES "PAGES"(id)
);

CREATE TABLE "PAGE_PERMISSIONS" (
    "page_id" uuid NOT NULL,
    "user_id" uuid,
    "group_id" uuid,
    CONSTRAINT fk_page_permissions_page_id FOREIGN KEY(page_id) REFERENCES "PAGES"(id),
    CONSTRAINT fk_page_permissions_user_id FOREIGN KEY(user_id) REFERENCES "USERS"(id),
    CONSTRAINT fk_page_permissions_group_id FOREIGN KEY(group_id) REFERENCES "GROUPS"(id)
);

CREATE TABLE "COMMENTS" (
    "id" uuid PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_by" uuid NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "version" INTEGER DEFAULT 1,
    "page_id" uuid NOT NULL,
    CONSTRAINT fk_comment_page FOREIGN KEY(page_id) REFERENCES "PAGES"(id),
    CONSTRAINT fk_comment_created_by FOREIGN KEY(created_by) REFERENCES "USERS"(id)
);

CREATE TABLE "ATTACHMENTS" (
    "id" uuid PRIMARY KEY,
    "name" varchar(255) UNIQUE NOT NULL,
    "url" TEXT NOT NULL,
    "type" VARCHAR(255) NOT NULL
);

CREATE TABLE "PAGE_ATTACHMENTS" (
    "page_id" uuid NOT NULL,
    "attachment_id" uuid NOT NULL,
    CONSTRAINT fk_page_attachment_page_id FOREIGN KEY(page_id) REFERENCES "PAGES"(id),
    CONSTRAINT fk_page_attachment_attachment_id FOREIGN KEY(attachment_id) REFERENCES "ATTACHMENTS"(id)
);

CREATE VIEW PAGE_CONTENT AS
    SELECT p.id, p.name, p.content, p.created_by, c.first_name AS c_first_name, c.last_name AS c_last_name, c.username AS c_username, p.updated_at, p.updated_by, u.first_name AS u_first_name, u.last_name AS u_last_name, u.username AS u_username
FROM "PAGES" AS p JOIN "USERS" AS u ON p.updated_by = u.id JOIN "USERS" AS c ON p.created_by = c.id;

INSERT INTO "GROUPS" (id, name, permissions, created_at, created_by, updated_at, updated_by) SELECT gen_random_uuid(), 'ADMIN', 'admin',
 now(), "USERS".id, now(), "USERS".id FROM "USERS" WHERE "username" = 'admin';
INSERT INTO "GROUPS" (id, name, permissions, created_at, created_by, updated_at, updated_by) SELECT gen_random_uuid(), 'USER',
'project:read,project:write,page:read,page:write', now(), "USERS".id, now(), "USERS".id FROM "USERS" WHERE "username" = 'admin';

INSERT INTO "USER_GROUPS" (user_id, group_id) SELECT "USERS".id, "GROUPS".id FROM "USERS", "GROUPS" WHERE "USERS".username = 'admin' AND "GROUPS".name = 'ADMIN';
