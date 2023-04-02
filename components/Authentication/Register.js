import React, { useState } from "react";

function LoginRegisterModal({ showLoginModal }) {
    const [formType, setFormType] = useState(showLoginModal);
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });
    const [registerFormData, setRegisterFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleFormTypeToggle() {
        setFormType(formType === "login" ? "register" : "login");
    }

    function handleLoginSubmit(event) {
        event.preventDefault();
        // handle login logic here
    }

    function handleRegisterSubmit(event) {
        event.preventDefault();
        // handle register logic here
    }

    function handleLoginInputChange(event) {
        const { name, value } = event.target;
        setLoginFormData({
            ...loginFormData,
            [name]: value,
        });
    }

    function handleRegisterInputChange(event) {
        const { name, value } = event.target;
        setRegisterFormData({
            ...registerFormData,
            [name]: value,
        });
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">
                {formType === "login" ? "Log In" : "Register"}
            </h2>

            {formType === "login" && (
                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="login-email">
                            Email
                        </label>
                        <input
                            className="border border-gray-400 p-2 w-full"
                            type="email"
                            id="login-email"
                            name="email"
                            value={loginFormData.email}
                            onChange={handleLoginInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="login-password">
                            Password
                        </label>
                        <input
                            className="border border-gray-400 p-2 w-full"
                            type="password"
                            id="login-password"
                            name="password"
                            value={loginFormData.password}
                            onChange={handleLoginInputChange}
                            required
                        />
                    </div>
                    <button
                        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        type="submit"
                    >
                        Log In
                    </button>
                </form>
            )}

            {formType === "register" && (
                <form onSubmit={handleRegisterSubmit}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full border border-gray-400 p-2 rounded-lg"
                            type="text"
                            id="username"
                            name="username"
                            value={registerFormData.username}
                            onChange={handleRegisterInputChange}
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
                            value={registerFormData.email}
                            onChange={handleRegisterInputChange}
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
                            value={registerFormData.password}
                            onChange={handleRegisterInputChange}
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
                            value={registerFormData.confirmPassword}
                            onChange={handleRegisterInputChange}
                        />
                    </div>

                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" type="submit">
                        Sign Up
                    </button>
                </form>)
            }
            <h2 className="cursor-pointer font-thin italic hover:text-orange-600 mt-4" onClick={handleFormTypeToggle}> {formType === "login" ? "Don't have a account?" : "Already Registered? Login Now!"}</h2>
        </>)

}

export default LoginRegisterModal