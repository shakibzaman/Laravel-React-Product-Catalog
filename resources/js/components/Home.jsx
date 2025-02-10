import React from "react";

export default function Home() {
    return (
        <div className="bg-gradient-to-r min-h-screen">
            <div className="flex items-center justify-center min-h-screen text-white">
                <div className="text-center space-y-6">
                    <h1 className="text-5xl font-extrabold text-black">Welcome!</h1>
                    <p className="text-xl text-black">This is the Home Page</p>
                    <button className="px-6 py-2 bg-yellow-500 text-black rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300">
                        Explore More
                    </button>
                </div>
            </div>
        </div>
    );
}
