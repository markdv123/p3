require('dotenv').config()
module.exports = {
  development: {
    database: "map_dev",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
      "underscored": true
    }
  },
  test: {
    database: "map_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
