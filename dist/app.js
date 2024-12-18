"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const errorhandler_1 = __importDefault(require("./middleware/errorhandler"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
// Connect to the database
(0, dbConnection_1.default)();
// Create an express application
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Use morgan for logging
app.use((0, morgan_1.default)("dev"));
// Use helmet for security
app.use((0, helmet_1.default)());
// Use cors for enabling Cross-Origin Resource Sharing with ports 3000, 3001 and 3002 in development
app.use((0, cors_1.default)());
// Use the JSON middleware
app.use(express_1.default.json());
// Define a health check endpoint
app.get("/health", (req, res) => {
    res.send("Hello World!");
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Use the routes defined in 'routes'
app.use("/api", routes_1.default);
// Error handling middleware
app.use(errorhandler_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
