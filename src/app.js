import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import sessions from "express-session";
import connectMongo from "connect-mongodb-session";
import passportStrategySetup from "./passport.js";
import { catch404, globalErrorHandler } from "./utils/errorHandlers.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(hpp());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Express sessions setup
const MongoStore = connectMongo(sessions);
const mongoStore = new MongoStore({
  collection: "sessions",
  uri: process.env.DB_URL
});
app.use(sessions({
  secret: process.env.SESSIONS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  store: mongoStore
}));
// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passportStrategySetup();

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export default app;
