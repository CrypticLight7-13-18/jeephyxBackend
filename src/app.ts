import { config } from "dotenv";
config();

import express from "express";
import morgan from "morgan";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";
import errorHandler from "./middleware/errorhandler";
import connectDB from "./config/dbConnection";

// Connect to the database
connectDB();

// Create an express application
const app = express();
const port = process.env.PORT || 3000;

// Use morgan for logging
app.use(morgan("dev"));

// Use helmet for security
app.use(helmet());

// Use cors for enabling Cross-Origin Resource Sharing with ports 3000, 3001 and 3002 in development
app.use(cors());

// Use the JSON middleware
app.use(express.json());

// Define a health check endpoint
app.get("/health", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the routes defined in 'routes'
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});