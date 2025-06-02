import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import cors from 'cors';

const __dirname= path.resolve();

dotenv.config({ path: path.resolve(__dirname, "./backend/.env") });
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Allow requests from your React frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});



server.listen(PORT, () =>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});

