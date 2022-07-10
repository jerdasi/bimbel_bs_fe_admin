import React from "react";

export default function PreviewPhoto({ stateChanger, status, src }) {
    return (
        <div
            className={[
                "w-full h-full absolute top-0 left-0 bg-black/50 z-50 items-center justify-center",
                status ? "flex" : "hidden",
            ].join(" ")}
            onClick={() => stateChanger(!status)}
        >
            <div className="photo w-1/2 h-2/3">
                <img
                    src={`${process.env.REACT_APP_API}/${src}`}
                    alt=""
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}
