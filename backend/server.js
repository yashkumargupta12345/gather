import express from 'express'
import http from "http";
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv'

const PORT = process.env.PORT || 8000
const app = express()
const server = http.createServer(app)
app.use(cors())
dotenv.config()

const io = new Server(server)

server.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT}`);
})