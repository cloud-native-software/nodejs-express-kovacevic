const dotenv = require('dotenv').config()
const bodyParser = require('body-parser'); // Potrebno za parsiranje tela zahteva u POST metodu
const client = require('./connection.js')
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json(), bodyParser.json())
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



app.delete('/users/:id', async (req, res) => {
  const userid = req.params.id;

  try {
    const result = await client.query('DELETE FROM test WHERE id = $1', [userid]);
    
    if (result.rowCount === 1) {
      res.status(200).json({ message: 'Korisnik uspešno obrisan.' });
    } else {
      res.status(404).json({ message: 'Korisnik nije pronađen.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Interna server greška');
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

