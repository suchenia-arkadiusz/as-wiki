CREATE TABLE "USER" (
    "id" uuid PRIMARY KEY ,
    "username" VARCHAR(50) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "e_mail" VARCHAR(255) UNIQUE NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "avatar_url" TEXT
);

CREATE TABLE "GROUP" (
    "id" uuid PRIMARY KEY,
    "name" VARCHAR(50) UNIQUE NOT NULL,
    "version" INTEGER DEFAULT 1
);

CREATE TABLE "USER_GROUP" (
    "user_id" uuid NOT NULL,
    "group_id" uuid NOT NULL,
    CONSTRAINT fk_user_group_user_id FOREIGN KEY(user_id) REFERENCES "USER"(id),
    CONSTRAINT fk_user_group_group_id FOREIGN KEY(group_id) REFERENCES "GROUP"(id)
);

CREATE TABLE "PROJECT" (
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
    CONSTRAINT fk_project_created_by FOREIGN KEY(created_by) REFERENCES "USER"(id),
    CONSTRAINT fk_project_updated_by FOREIGN KEY(updated_by) REFERENCES "USER"(id)
);

CREATE TABLE "PROJECT_PERMISSIONS" (
    "project_id" uuid NOT NULL,
    "user_id" uuid,
    "group_id" uuid,
    CONSTRAINT fk_project_permissions_project_id FOREIGN KEY(project_id) REFERENCES "PROJECT"(id),
    CONSTRAINT fk_project_permissions_user_id FOREIGN KEY(user_id) REFERENCES "USER"(id),
    CONSTRAINT fk_project_permissions_group_id FOREIGN KEY(group_id) REFERENCES "GROUP"(id)
);

CREATE TABLE "PAGE" (
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
    CONSTRAINT fk_page_created_by FOREIGN KEY(created_by) REFERENCES "USER"(id),
    CONSTRAINT fk_page_updated_by FOREIGN KEY(updated_by) REFERENCES "USER"(id),
    CONSTRAINT fk_page_space_id FOREIGN KEY(project_id) REFERENCES "PROJECT"(id),
    CONSTRAINT fk_page_parent_id FOREIGN KEY(parent_id) REFERENCES "PAGE"(id)
);

CREATE TABLE "PAGE_PERMISSIONS" (
    "page_id" uuid NOT NULL,
    "user_id" uuid,
    "group_id" uuid,
    CONSTRAINT fk_page_permissions_page_id FOREIGN KEY(page_id) REFERENCES "PAGE"(id),
    CONSTRAINT fk_page_permissions_user_id FOREIGN KEY(user_id) REFERENCES "USER"(id),
    CONSTRAINT fk_page_permissions_group_id FOREIGN KEY(group_id) REFERENCES "GROUP"(id)
);

CREATE TABLE "COMMENT" (
    "id" uuid PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_by" uuid NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "version" INTEGER DEFAULT 1,
    "page_id" uuid NOT NULL,
    CONSTRAINT fk_comment_page FOREIGN KEY(page_id) REFERENCES "PAGE"(id),
    CONSTRAINT fk_comment_created_by FOREIGN KEY(created_by) REFERENCES "USER"(id)
);

CREATE TABLE "ATTACHMENT" (
    "id" uuid PRIMARY KEY,
    "name" varchar(255) UNIQUE NOT NULL,
    "url" TEXT NOT NULL,
    "type" VARCHAR(255) NOT NULL
);

CREATE TABLE "PAGE_ATTACHMENT" (
    "page_id" uuid NOT NULL,
    "attachment_id" uuid NOT NULL,
    CONSTRAINT fk_page_attachment_page_id FOREIGN KEY(page_id) REFERENCES "PAGE"(id),
    CONSTRAINT fk_page_attachment_attachment_id FOREIGN KEY(attachment_id) REFERENCES "ATTACHMENT"(id)
);
