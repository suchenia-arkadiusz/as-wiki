import pg from "pg";

export const dbConnect = (config) => {
  const client = new pg.Client({ ...config });

  client.connect();

  return client;
};
