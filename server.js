import 'dotenv/config'
import express from 'express'
import expressSession from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { connectMongoDB } from './mongodb/mongodb.js'
import authRouter from './routes/auth_routes.js'
import eventsRouter from './routes/events_routes.js'

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Initial Connection to MongoDB */
app.use((req, res, next) => {
  connectMongoDB();
  next();
})

app.use('/authentication', authRouter);
app.use('/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})