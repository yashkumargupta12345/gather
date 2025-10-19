import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const client = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1/users`
})

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);


    const [userData, setUserData] = useState(authContext);


    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                userName: username,
                password: password
            })

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        }
        catch (error) {
            console.error("Registration error", error);
            throw error
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                userName: username,
                password: password
            });

            console.log(username, password)
            console.log(request.data)

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home")
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }

    }

    const data = {
        userData, setUserData, handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}