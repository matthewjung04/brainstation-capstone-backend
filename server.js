import 'dotenv/config'
import express from 'express'
import expressSession from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import authRouter from './routes/auth_routes.js'

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

app.use('/authentication', authRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})