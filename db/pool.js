const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`
});