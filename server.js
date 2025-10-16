
// Title: Middleware Implementation for Logging and Bearer Token Authentication
// Objective: Learn to build and integrate middleware functions in an Express.js
// application for request logging and token-based route protection.

const express = require('express');
const app = express();

// ---------------------------
// 1️⃣ Logging Middleware (Global)
// ---------------------------
// Logs the HTTP method, URL, and timestamp for each incoming request.
const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // Move to the next middleware or route handler
};

// Apply logging middleware to all routes
app.use(loggerMiddleware);

// ---------------------------
// 2️⃣ Authentication Middleware (For Protected Routes)
// ---------------------------
// Checks for Authorization header and verifies Bearer token.
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  // Expected format: "Bearer mysecrettoken"
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || token !== 'mysecrettoken') {
    return res.status(403).json({ error: 'Invalid or missing token' });
  }

  // Token is valid → proceed
  next();
};

// ---------------------------
// 3️⃣ Define Routes
// ---------------------------

// Public route (no authentication required)
app.get('/public', (req, res) => {
  res.json({
    message: '✅ Welcome to the public route! No authentication required.',
  });
});

// Protected route (authentication required)
app.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: '🔒 Access granted! You reached the protected route.',
  });
});

// ---------------------------
// 4️⃣ Start the Server
// ---------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
