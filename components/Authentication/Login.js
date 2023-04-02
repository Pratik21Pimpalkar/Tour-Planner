import React, { useState } from "react";

function Login({ isOpen, setIsOpen, toggleModal }) {
    const closeModal = () => {
        setIsOpen(false);
    }
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleSubmit(event) {
        event.preventDefault();
        // handle login logic here
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData, [name]: value,
        });
    }
    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" onClick={closeModal}>
                    <div className="flex items-center justify-center min-h-screen ">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

                        <div className="bg-white rounded-lg p-6 z-10 sm:w-[60%]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center w-full ">
                                <div className="flex items-center justify-center  w-full">
                                    <div className="bg-white rounded-lg p-8 shadow-md w-full ">
                                        <h2 className="text-2xl font-bold mb-6">Login</h2>
                                        <form onSubmit={handleSubmit}>
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

                                            <button className="bg-orange-500 text-lg text-white px-4 py-2 rounded-lg" type="submit">
                                                Login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
