if (!process.env.DATABASE_URL) {
  require('dotenv').config();
}

const env = process.env.NODE_ENV || 'development';
const ssl = process.env.DATABASE_SSL === 'true' ? true : false;

module.exports = {
  [env]: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    migrationStorageTableName: '_migrations',
    dialectOptions: {
      ssl,
    },
  }
};
