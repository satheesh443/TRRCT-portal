const serverless = require('serverless-http');
const path = require('path');
const dotenv = require('dotenv');

// Load environment from backend/.env or root .env
dotenv.config({ path: path.join(__dirname, '../../backend/.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

const { connectDB } = require('../../backend/src/config/db');
const app = require('../../backend/server');

const serverlessHandler = serverless(app);

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectDB();
  return await serverlessHandler(event, context);
};
