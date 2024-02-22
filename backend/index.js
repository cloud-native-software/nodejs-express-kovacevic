const dotenv = require('dotenv').config()
const bodyParser = require('body-parser'); // Potrebno za parsiranje tela zahteva u POST metodu
const client = require('./connection.js')
const cors = require("cors")
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json(), bodyParser.json())
app.use(cors({
  origin: ["http://localhost:5173"]
}))

client.connect()

app.get('/users', async (req, res) => {
  try {
    let orderBy = req.query.orderBy || 'id';
    let sortOrder = req.query.sortOrder || 'asc';

    if (!['asc', 'desc'].includes(sortOrder.toLowerCase())) {
      return res.status(400).json({ error: 'Neispravan redosled sortiranja. Dozvoljeni su "asc" i "desc".' });
    }

    const result = await client.query(`SELECT * FROM test ORDER BY ${orderBy} ${sortOrder}`);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Interna server greška');
  }
  client.end
})
app.post('/users', async (req, res) => {
  console.log(req.body)
  const { id, firstname, lastname, location } = req.body
  await client.query(`INSERT INTO test VALUES ($1,$2,$3,$4)`, [id, firstname, lastname, location], (err, result) => {
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
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  const { firstname, lastname, location } = req.body;

  try {
    const result = await client.query(
      'UPDATE test SET firstname = $1, lastname = $2, location = $3 WHERE id = $4',
      [firstname, lastname, location, userId]
    );

    if (result.rowCount === 1) {
      res.status(200).json({ message: 'Korisnik uspešno ažuriran.' });
    } else {
      res.status(404).json({ message: 'Korisnik nije pronađen.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Interna server greška');
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

