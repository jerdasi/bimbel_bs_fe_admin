import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormLogin() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    const checkLogin = (event) => {
        event.preventDefault();
        if (username === "admin" && password === "admin") {
            localStorage.setItem("token", "tes");
            navigate("/dashboard");
            // navigate("/dashboard", { state: { id: 1, id_paket: 1 } });
        } else {
            Swal.fire(
                "Login Gagal",
                "Periksa Kembali Username dan Password!",
                "error"
            );
        }
    };

    return (
        <div className="w-full md:w-1/2 flex flex-col items-center p-4 md:p-0">
            <img
                src="images/logo-bs.png"
                alt="logo-bimbel"
                className="w-auto h-20 md:h-28"
            />

            <form
                action="POST"
                className="w-full md:w-4/6 flex flex-col gap-4 md:gap-8 mt-4 items-center"
                onSubmit={checkLogin}
            >
                <h1 className="text-xl md:text-3xl font-bold tracking-widest">
                    LOGIN
                </h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full h-10 md:h-12 pl-4 border border-black rounded-lg focus:shadow-xl"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full h-10 md:h-12 pl-4 border border-black rounded-lg focus:shadow-xl"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-1/2 h-10 border border-black rounded-lg tracking-widest font-bold mt-4 hover:bg-merah-bs hover:text-white"
                >
                    LOGIN
                </button>
            </form>
        </div>
    );
}
