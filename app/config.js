const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '3000',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
  },
};

export default config;
