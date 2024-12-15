import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import { config } from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;

// Use morgan for logging
app.use(morgan('dev'));

// Use helmet for security
app.use(helmet());

// Use cors for enabling Cross-Origin Resource Sharing with ports 3000, 3001 and 3002 in development
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
}));

// Use the JSON middleware
app.use(express.json());

// Define a health check endpoint
app.get('/health', (req, res) => {
  res.send('Hello World!');
});

// Use the routes defined in 'routes'
app.use('/api', routes);

// Error handling middleware
// To be written here

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
