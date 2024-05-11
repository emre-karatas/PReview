require("dotenv").config();
const express = require("express");
const router = express.Router();
const supabase = require("./supabaseClient");

// Signup route without password hashing
router.post("/signup", async (req, res) => {
    const { username, fullName, email, password, userType } = req.body;
  
    try {
      // Insert user directly with plain text password
      const { data, error } = await supabase
        .from("users")
        .insert([{ username, full_name: fullName, email, password, user_type: userType }]);
  
      if (error) throw error;
  
      res.status(201).json({ message: "User created", data });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user", details: error.message });
    }
});

// Login route without password hashing
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Retrieve user directly by email
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .limit(1);
  
      if (error || users.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const user = users[0];
  
      // Compare passwords directly
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ error: "Failed to login", details: error.message });
    }
});
  
// Get user route
router.get("/user/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error) throw error;

    res.status(200).json({ user: data });
  } catch (error) {
    res.status(404).json({ error: "User not found", details: error.message });
  }
});
  
  // Edit user route
router.put("/user/:username", async (req, res) => {
  const { fullName, email, userType } = req.body;
  const username = req.params.username;
  
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ username, full_name: fullName, email, user_type: userType })
      .eq("username", username);

    if (error) throw error;

    res.status(200).json({ message: "User updated", user: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user", details: error.message });
  }
});
  
// Delete user route
router.delete("/user/:username", async (req, res) => {
  const username = req.params.username;

  try {
      const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("username", username);

      if (error) throw error;

      res.status(200).json({ message: "User deleted", user: data });
  } catch (error) {
      res.status(500).json({ error: "Failed to delete user", details: error.message });
  }
});
  
module.exports = router;