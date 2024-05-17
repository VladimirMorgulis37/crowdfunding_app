const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.post('/api/campaigns', async (req, res) => {
  try {
      const { name, description, goal } = req.body;
      const data = ({name, description, goal});
      const query = "INSERT INTO campaigns (data) VALUES ($1) RETURNING *";
      const result = await pool.query(query, [data]);
      res.json(result.rows[0]);
  } catch (error) {
      console.error('Error creating campaign:', error);
      res.status(500).json({ error: 'An error occurred while creating the campaign' });
  }
  });

app.get('/api/campaigns', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM campaigns');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      res.status(500).json({ error: 'An error occurred while fetching campaigns' });
    }
  });

app.get('/api/campaigns/:id', async (req, res) => {
const { id } = req.params;
try {
    const result = await pool.query('SELECT * FROM campaigns WHERE id = $1', [id]);
    if (result.rows.length === 0) {
    res.status(404).json({ error: 'Campaign not found' });
    } else {
    res.json(result.rows[0]);
    }
} catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ error: 'An error occurred while fetching the campaign' });
}
});

app.put('/api/campaigns/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, goal } = req.body;
    try {
      const result = await pool.query(
        'UPDATE campaigns SET data = $1 WHERE id = $2 RETURNING *',
        [{ name, description, goal }, id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Campaign not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
      res.status(500).json({ error: 'An error occurred while updating the campaign' });
    }
  });

app.delete('/api/campaigns/:id', async (req, res) => {
const { id } = req.params;
try {
    const result = await pool.query('DELETE FROM campaigns WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
    res.status(404).json({ error: 'Campaign not found' });
    } else {
    res.json({ message: 'Campaign deleted successfully' });
    }
} catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ error: 'An error occurred while deleting the campaign' });
}
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });