#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();


const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ),
  last_name VARCHAR ( 255 ),
  email VARCHAR ( 255 ) UNIQUE,
  password VARCHAR ( 255 ),
  is_member BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id),
  message VARCHAR ( 255 ),
  time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
