import { sql } from "../config/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId, email, role) => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;


  console.log("[DEBUG] Register request:", { username, email });

  if (!username || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "All fields are required" 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters"
    });
  }

  try {
    
    const existingUser = await sql`
      SELECT * FROM users 
      WHERE email = ${email} OR username = ${username}
    `;

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or username"
      });
    }

   
    const userCount = await sql`SELECT COUNT(*) FROM users`;
    const role = parseInt(userCount[0].count) === 0 ? "admin" : "customer";

    
    console.log("[DEBUG] Assigning role:", role);

    
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    
    console.log("[DEBUG] Generated salt/hash:", { salt, hashedPassword });

    
    const newUser = await sql`
      INSERT INTO users (username, email, password_hash, role)
      VALUES (${username}, ${email}, ${hashedPassword}, ${role})
      RETURNING id, username, email, role, created_at
    `;

    
    console.log("[DEBUG] New user created:", newUser[0]);

    const token = generateToken(newUser[0].id, newUser[0].email, newUser[0].role);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: `Account created successfully as ${role}`,
      user: {
        id: newUser[0].id,
        username: newUser[0].username,
        email: newUser[0].email,
        role: newUser[0].role,
      },
    });

  } catch (error) {
    console.error("[ERROR] Register failed:", error);
    res.status(500).json({ 
      success: false, 
      message: "Registration failed. Please try again." 
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  try {
    
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    
    const isValidPassword = await bcryptjs.compare(password, user[0].password_hash);

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    
    const token = generateToken(user[0].id, user[0].email, user[0].role);

   
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        role: user[0].role,
      },
    });
  } catch (error) {
    console.log("Error in login function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.log("Error in logout function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await sql`
      SELECT id, username, email, role, created_at 
      FROM users WHERE id = ${req.user.userId}
    `;

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user: user[0]
    });
  } catch (error) {
    console.log("Error in getUserProfile function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
