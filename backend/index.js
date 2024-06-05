const express = require('express');
const cors = require('cors');
// const { Pool } = require('pg'); // бро погиб
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; // а портики уже настроены!

var corsOptions = {
  origin: "frontend-production-42ae.up.railway.app" // чтобы токо отсюда можно было принимать запросы
}

app.use(cors(corsOptions));
app.use(express.json()); // парсим json
app.use(express.urlencoded({ extended: true })); // парсим запросы content-type - application/x-www-form-urlencoded

require('./routes/campaign.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
const db = require("./models");
const Role = db.role;


const dbConfig = require("./config/db.config");

db.mongoose
  .connect("mongodb+srv://randomcat149:eyGPF1iHviKdrthO@cluster0.pjcahnm.mongodb.net/")
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial(); // что это?
  })
  .catch(err => {
    console.log("Connection error", err);
    process.exit(); // ошибочки
  });

  function initial() { 
    Role.estimatedDocumentCount()
      .then(count => {
        if (count === 0) {
          new Role({ name: "user" }).save()
            .then(() => {
              console.log("added 'user' to roles collection");
            })
            .catch(err => {
              console.log("error", err);
            });
  
          new Role({ name: "moderator" }).save()
            .then(() => {
              console.log("added 'moderator' to roles collection");
            })
            .catch(err => {
              console.log("error", err);
            });
  
          new Role({ name: "admin" }).save()
            .then(() => {
              console.log("added 'admin' to roles collection");
            })
            .catch(err => {
              console.log("error", err);
            });
        }
      })
      .catch(err => {
        console.log("error", err);
      });
  }
// const pool = new Pool({ // это удаляется, я перешёл на монго дб
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//   });



app.get('/', (req, res) => {
    res.send('Hello World!'); // /б/аза
  });

// app.post('/api/campaigns', async (req, res) => {
//   try {
//       const { name, description, goal } = req.body;
//       const data = ({name, description, goal});
//       const query = "INSERT INTO campaigns (data) VALUES ($1) RETURNING *";
//       const result = await pool.query(query, [data]);
//       res.json(result.rows[0]);
//   } catch (error) {
//       console.error('Error creating campaign:', error);
//       res.status(500).json({ error: 'An error occurred while creating the campaign' });
//   }
//   });

// app.get('/api/campaigns', async (req, res) => {
//     try {
//       const result = await pool.query('SELECT * FROM campaigns');
//       res.json(result.rows);
//     } catch (error) {
//       console.error('Error fetching campaigns:', error);
//       res.status(500).json({ error: 'An error occurred while fetching campaigns' });
//     }
//   });

// app.get('/api/campaigns/:id', async (req, res) => {
// const { id } = req.params;
// try {
//     const result = await pool.query('SELECT * FROM campaigns WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//     res.status(404).json({ error: 'Campaign not found' });
//     } else {
//     res.json(result.rows[0]);
//     }
// } catch (error) {
//     console.error('Error fetching campaign:', error);
//     res.status(500).json({ error: 'An error occurred while fetching the campaign' });
// }
// });

// app.put('/api/campaigns/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, description, goal } = req.body;
//     try {
//       const result = await pool.query(
//         'UPDATE campaigns SET data = $1 WHERE id = $2 RETURNING *',
//         [{ name, description, goal }, id]
//       );
//       if (result.rows.length === 0) {
//         res.status(404).json({ error: 'Campaign not found' });
//       } else {
//         res.json(result.rows[0]);
//       }
//     } catch (error) {
//       console.error('Error updating campaign:', error);
//       res.status(500).json({ error: 'An error occurred while updating the campaign' });
//     }
//   });

// app.delete('/api/campaigns/:id', async (req, res) => {
// const { id } = req.params;
// try {
//     const result = await pool.query('DELETE FROM campaigns WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0) {
//     res.status(404).json({ error: 'Campaign not found' });
//     } else {
//     res.json({ message: 'Campaign deleted successfully' });
//     }
// } catch (error) {
//     console.error('Error deleting campaign:', error);
//     res.status(500).json({ error: 'An error occurred while deleting the campaign' });
// }
// });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  }); // почему я вставил это в самый конец?