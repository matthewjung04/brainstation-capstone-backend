import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectMongoDB from './mongodb.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

/* Middleware for error handling */
app.use((req, res, next) => {
  res.status(500).send('Something went wrong!');
  next();
})

app.use((req,res) => {
  connectMongoDB();
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})