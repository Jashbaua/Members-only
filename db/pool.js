const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`
});