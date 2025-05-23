import React, { useState } from "react";
import "../styles/LoginPage.css";
import loginIllustration from "../assets/loginImg.webp"; // Make sure to place your uploaded image in 'assets' folder

export default function LoginPage() {
    const [role, setRole] = useState("employee");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const endpoint =
            role === "admin"
                ? "http://localhost:5000/api/auth/admin/login"
                : "http://localhost:5000/api/auth/employee/login";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }); console.log(response)
            const data = await response.json();

            if (data.success && data.user) {

                setMessage("Login successful");
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Only if defined

                window.location.href = `/${role}/dashboard`;
            } else {
                console.log("hi")
                setMessage(data.message || "Login failed");
            }
        } catch (error) {
            setMessage("Login failed. Please try again.");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-left">
                <h2>Holla, Welcome Back</h2>
                <p className="subheading">Hey, welcome back to your special place</p>

                <div className="role-toggle">
                    <button onClick={() => setRole("admin")} className={role === "admin" ? "active" : ""}>Admin</button>
                    <button onClick={() => setRole("employee")} className={role === "employee" ? "active" : ""}>Employee</button>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="form-options">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit">Sign In</button>
                    {message && <p className="message">{message}</p>}
                </form>


            </div>

            <div className="login-right">
                <img src={loginIllustration} alt="Login Illustration" />
            </div>
        </div>
    );
}
