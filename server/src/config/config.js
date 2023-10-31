export const config = {
  db: {
    user: process.env.DB_USERNAME || "aswiki",
    password: process.env.DB_PASSWORD || "84H33r0xJz5XhCZBtuQLSW9IsGFrlGPS",
    database: process.env.DB_NAME || "aswiki",
    port: process.env.DB_PORT || 5432,
    host: process.env.DB_HOST || "localhost",
  },
  dbClient: undefined,
  uriPrefix: "/api/v1",
  tokenSecret: process.env.APP_TOKEN_SECRET || "dev-token",
};
