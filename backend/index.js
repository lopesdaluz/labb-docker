// nodemon
const dotenv = require("dotenv");
const { Client } = require("pg");
const express = require("express");
const path = require("path");
const cors = require("cors");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(path.resolve(), "public")));

//GET
//Get request to api enpoint
app.get("/api", async (_request, response) => {
  //requesting data from database lopes and the result is stored in the rows
  const { rows } = await client.query("SELECT * FROM lopes");
  //row containing the result
  response.send(rows);
});

//POST
//POST request to api/add enpoint
app.post("/api/add", async (request, response) => {
  const { name, age } = request.body;
  try {
    //insert new entry in lopes table in database
    const result = await client.query(
      "INSERT INTO lopes (name, age) VALUES ($1, $2) RETURNING *",
      [name, age]
    );
    //if its successful give the response status 201. Send the new entry as json resposne
    response.status(201).json(result.rows[0]);
    //if its error give response status 500 and send error message as json response
  } catch (error) {
    response.status(500).json({ error: "Error adding entry" });
  }
});

//PUT
//Put request to api/update/:id enpoint
app.put("/api/update/:id", async (request, response) => {
  const id = request.params.id;
  const { name, age } = request.body;
  try {
    //to update an entry in lopes table in database
    const result = await client.query(
      "UPDATE lopes SET name = $1, age = $2 WHERE id = $3 RETURNING *",
      [name, age, id]
    );
    //if the update is successful give the response status 200. Send the the update entry as json resposne
    response.status(200).json(result.rows[0]);
    //if its an error during update give response status 500 and send error message as json response
  } catch (error) {
    response.status(500).json({ error: "Error updating entry" });
  }
});

//DELETE
//Delete request to api/delete/:id enpoint
app.delete("/api/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    //to delete an entry from lopes table in the database
    const result = await client.query("DELETE FROM lopes WHERE id = $1", [id]);
    //if deleiting is successful give the response status 204. and end the response without sending json
    response.status(204).end();
    //if its an error during deleting give response status 500 and send error message as json response
  } catch (error) {
    response.status(500).json({ error: "Error deleting entry" });
  }
});

app.listen(3000, () => {
  console.log("Ready at http://localhost:3000/");
});

// Im using the $1,2,3 as placeholders for the values i want to use in my SQL queries. I use these values in an array[name, age] and the database query replace the placeholder with the values when the query is being mounted. Other way to use instead of placeholder is directly include the values from name, age with ${name},${age}
