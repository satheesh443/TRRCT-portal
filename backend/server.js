const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/db');

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, '../frontend/public')));
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Connect to Database (Primary MongoDB with automatic unified failover)
connectDB();

// API Routes Router (Supports direct /api and Netlify Serverless /.netlify/functions/api)
const apiRouter = express.Router();
apiRouter.use('/auth', require('./src/routes/authRoutes'));
apiRouter.use('/student', require('./src/routes/studentRoutes'));
apiRouter.use('/staff', require('./src/routes/staffRoutes'));
apiRouter.use('/admin', require('./src/routes/adminRoutes'));
apiRouter.use('/library', require('./src/routes/libraryRoutes'));
apiRouter.use('/public', require('./src/routes/noticeRoutes'));

app.use('/api', apiRouter);
app.use('/.netlify/functions/api', apiRouter);

// Serve HTML Portals
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/student-portal', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/student-portal.html'));
});

app.get('/staff-portal', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/staff-portal.html'));
});

app.get('/admin-portal', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/admin-portal.html'));
});

app.get('/library', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/library.html'));
});

// Fallback route (Express 4 & 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start Server when run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🏛️  TRR COLLEGE OF TECHNOLOGY (TRRCT) - CAMPUS ERP`);
    console.log(`🚀 Server operational at: http://localhost:${PORT}`);
    console.log(`📌 Primary Database: MongoDB (/trrct_portal)`);
    console.log(`📁 Secondary Database: Google Drive Common Library`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
