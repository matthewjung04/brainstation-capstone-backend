import 'dotenv/config'
import express from 'express'
import expressSession from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import { connectMongoDB } from './mongodb/mongodb.js'
import authRouter from './routes/auth_routes.js'
import eventsRouter from './routes/events_routes.js'

const app = express();
const PORT = process.env.PORT || 5050;

const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'rootroot';
const mongodb_url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@brainstationcapstone.4u1nh.mongodb.net/`;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Initial Connection to MongoDB */
app.use((req, res, next) => {
  const client = new MongoClient(mongodb_url);
  client.connect()
  next();
})

app.use('/authentication', authRouter);
app.use('/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})