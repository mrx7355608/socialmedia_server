import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./utils/db.js";

const startServer = async () => {
  // Connect to database
  await connectDB(process.env.DB_URL);
  // Start listening
  const port = process.env.PORT || 5000;
  app.listen(port, async () => {
    console.log("server started on port", port);
  });
};

startServer();
