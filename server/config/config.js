require('dotenv').config(); // Load environment variables from a .env file

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'postgres',
    password: process.env.DEV_DB_PASSWORD || 'root',
    database: process.env.DEV_DB_NAME || 'les_chat',
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    dialect: process.env.DEV_DB_DIALECT || 'postgres',
  },
  production: {
    dialect: process.env.PROD_DB_DIALECT || 'postgres',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,// Environment variable for production database URL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
