import 'dotenv/config'
import express from 'express'
import expressSession from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import connectMongoDB from './mongoDB/mongodb.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(helmet());

/* Middleware for error handling */
app.use((req, res, next) => {
  res.status(500).send('Something went wrong!');
  next();
})

app.use((req,res) => {
  connectMongoDB();
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})