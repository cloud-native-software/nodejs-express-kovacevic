const dotenv = require('dotenv').config
const client = require('./connection.js')
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())
client.connect()

app.get('/users', (req, res) => {
  client.query(`SELECT * FROM test`, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result.rows)

  })
  client.end
})
app.post('/users', (req, res) => {
  const { id, firstname, lastname, location } = req.body
  client.query(`INSERT INTO test VALUES ($1,$2,$3,$4)`, [id, firstname, lastname, location], (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })

})
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

