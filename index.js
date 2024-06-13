import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import ejs from 'ejs';

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

const db = new pg.Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

db.connect()
    .then(() => {
        console.log('Connected to the database');
        })
    .catch(err => {
        console.error('Error connecting to the database:', err);
});

// Example route to handle POST requests
app.post('/user', async (req, res) => {
    try {
        const { name, id } = req.body;
        console.log('Name:', name, 'ID:', id);

        const query = 'INSERT INTO location (name, id) VALUES ($1, $2)';
        await db.query(query, [name, id]);

        res.sendStatus(200);
    } catch (error) {
        console.error('Error inserting user into the database:', error);
        res.sendStatus(500);
    }
});

// Listening to a port
app.listen(5000, () => {
    console.log('Listening on port 5000');
});
