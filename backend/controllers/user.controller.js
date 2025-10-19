import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import crypto from "crypto";


// User Login controller
export const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).json({ message: "Please provide Username and Password." })
    }
    try {
        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found!" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex")
            user.token = token
            await user.save()
            return res.status(httpStatus.OK).json({ token: token })
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid username or password" })
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong ${error}` })
    }
}


// User Register controller
export const register = async (req, res) => {
    const { name, userName, password } = req.body

    if (!name || !userName || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide all required fields" })
    }

    try {
        const existingUser = await User.findOne({ userName })
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: name,
            userName: userName,
            password: hashedPassword
        })

        await newUser.save()

        res.status(httpStatus.CREATED).json({ message: "User registered!" })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong ${error}` })
    }
}