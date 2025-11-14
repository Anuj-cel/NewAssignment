import {NextFunction, Request, Response} from 'express';
import express from 'express';
import cors from 'cors';    
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './models/User';
import mongoose = require('mongoose');
import { signupSchema,loginSchema } from './validations/authValidation';
dotenv.config();
console.log("Mongo URI:", process.env.MONGO_URI);
const app = express();
app.use(cors());
const port = 5000; 
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
  await mongoose
  .connect(process.env.MONGO_URI || "")
  console.log("✅ Connected to MongoDB")
    } catch (error) { 
    console.error("❌ MongoDB connection error:", error);
    }
  }
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post("/auth/signup",async (req: Request, res: Response) => {
  try {
    
    console.log("Signup request body:", req.body);
    const { error, value } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, roles } = value;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup error", error });
  }
});

app.post("/auth/login",async (req: Request, res: Response) => {
  try {
    
    console.log("Login request body:", req.body);
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = value;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, roles: user.roles, name: user.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token,name:user.name,roles:user.roles,email:user.email }); 
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
}
);

app.get("/auth/me",async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      roles: string;
      name: string;
    };

    res.json({
      id: decoded.id,
      name: decoded.name,
      roles: decoded.roles,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.use((err: any, req:Request, res:Response, next:NextFunction) => {
  console.error(err.message);
  res.status(500).json({ message: "Something went wrong!" });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});