import express from 'express'
import { register, login } from "../controllers/user.controller.js";

const userRouter = express.Router()

// register route
userRouter.post('/register', register)
// login route
userRouter.post('/login', login)

export default userRouter