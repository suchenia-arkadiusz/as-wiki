ALTER TABLE "PAGE_PERMISSIONS" ADD UNIQUE (page_id, user_id);
ALTER TABLE "PAGE_PERMISSIONS" ADD UNIQUE (page_id, group_id);
