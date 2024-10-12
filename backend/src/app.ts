import express from 'express';
import pdfGeneratorRouter from './routes/pdfGenerator';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/generate-pdf', pdfGeneratorRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
