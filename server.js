import 'dotenv/config'
import express from 'express'
import expressSession from 'express-session'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
import { connectMongoDB } from './mongodb/mongodb.js'
import authRouter from './routes/auth_routes.js'
import eventsRouter from './routes/events_routes.js'

const app = express();
const PORT = process.env.PORT || 5050;

const mongodb_url = process.env.MONGODB_URL;
const jsonSecretKey = process.env.JSON_SECRET;

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

const getToken = (req) => {
  if(!req.headers.authorization) {
    return;
  } else {
    return req.headers.authorization.split(" ")[1];
  }
}

app.use((req, res, next) => {
  if (req.url === "/authentication/sign-up" || req.url === "/authentication/sign-in" || req.url.includes('/events')) {
    next();
  } else {
    const token = getToken(req);

    if(token) {
      if(jwt.verify(token,jsonSecretKey)) {
        req.decode = jwt.decode(token);
        next();
      } else {
        res.status(403).json({ error: "Not Authorized." });
      }
    } else {
      res.status(403).json({ error: "Not Authorized (No Token)." });
    }
  }
})

mongoose.connect(mongodb_url, { dbName: 'TimeZest' })

app.use('/authentication', authRouter);
app.use('/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})