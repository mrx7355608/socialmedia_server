import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
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

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export default app;
