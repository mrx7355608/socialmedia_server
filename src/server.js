import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./utils/db.js";

const startServer = async () => {
  // Connect to database
  await connectDB(process.env.DB_URL);
  app.listen(3000, async () => {
    console.log("server started on port 3000");
  });
};

startServer();
