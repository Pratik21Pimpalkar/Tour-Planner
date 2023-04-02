import React, { useState } from "react";
import LoginRegisterModal from "./Register";

function Modal({ isOpen, setIsOpen, showLoginModal }) {
    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" onClick={closeModal}>
                    <div className="flex items-center justify-center min-h-screen ">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

                        <div className="bg-white rounded-lg p-6 z-10 sm:w-[60%]" onClick={(e) => e.stopPropagation()}>
                            <LoginRegisterModal showLoginModal={showLoginModal} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
