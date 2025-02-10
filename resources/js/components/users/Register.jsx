import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../auth/AuthContext";
import apiRequest from "./../utils/apiRequest";

export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await apiRequest("/register", "POST", formData);
            if (response.data.status === 201) {
                setMessage({
                    type: "success",
                    text: "Registration successful!",
                });
                login(response.data.token.plainTextToken);
                navigate("/home");
            } else {
                setMessage({ type: "error", text: response.data.message });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "Registration failed. Try again.",
            });
        }

        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-4 mt-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Add New User
                </h2>

                {message && (
                    <p
                        className={`text-sm text-center p-2 rounded ${
                            message.type === "success"
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100"
                        }`}
                    >
                        {message.text}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="primary-btn mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {loading ? "Registering..." : "Create New"}
                    </button>
                </form>
            </div>
        </div>
    );
}
