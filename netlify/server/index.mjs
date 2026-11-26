// Netlify Server entry point.
// Starts the existing Express backend unchanged. backend/server.js calls
// app.listen(process.env.PORT), which Netlify Server picks up automatically.
import '../../backend/server.js';
