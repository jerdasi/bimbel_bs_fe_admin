import React from "react";

export default function Loader({ status = false }) {
    return (
        <div
            className={[
                "w-[100vw] h-[100vh] z-50 items-center justify-center absolute top-0 left-0 bg-black/50 text-white text-2xl",
                status ? "flex" : "hidden",
            ].join(" ")}
        >
            <h1 className="animate-pulse">Sedang Proses... Harap Menunggu</h1>
        </div>
    );
}
