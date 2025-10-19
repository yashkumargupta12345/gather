import express from 'express'
import http from "http";
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv'
import connectToDB from './configs/db.js';

// Import statements for routes
import userRouter from './routes/user.route.js';
import { connectToSocket } from './controllers/socketManager.js';

// MongoDB Connection
dotenv.config()
connectToDB()

// Server setup
const PORT = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())


// User Routes
app.use("/api/v1/users", userRouter);

const io = connectToSocket(server)

server.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT}`);
})