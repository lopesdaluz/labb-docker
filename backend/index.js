// nodemon
const dotenv = require("dotenv"),
  { Client } = require("pg");

const express = require("express"),
  path = require("path");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();

app.get("/api", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM lopes ");

  response.send(rows);
});

app.use(express.static(path.join(path.resolve(), "public")));

app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/");
});
