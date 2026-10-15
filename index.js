const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "API is working"
  });
});

// Create User API
app.post("/api/users", (req, res) => {
  const { name, email, password } = req.body;

  console.log("Request body:", req.body);

  res.status(201).json({
    message: "User created successfully",
    user: {
      name,
      email
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});