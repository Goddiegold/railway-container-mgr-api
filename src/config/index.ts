export const Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  WEB_CLIENT: process.env.WEB_CLIENT || 'http://localhost:5173',
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  WEB_SERVER_PORT: process.env.PORT || 8989,
  RAILWAY: {
    GQL_URL: process.env.RAILWAY_GQL_URL,
    API_TOKEN: process.env.RAILWAY_API_TOKEN,
  },
};
