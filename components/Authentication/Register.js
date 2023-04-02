import React, { useState } from "react";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleSubmit(event) {
        event.preventDefault();
        // handle sign up logic here
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full border border-gray-400 p-2 rounded-lg"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full border border-gray-400 p-2 rounded-lg"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full border border-gray-400 p-2 rounded-lg"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="w-full border border-gray-400 p-2 rounded-lg"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
