import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FrontNavbar from "../partials/FrontNavbar";
import apiRequest from "../utils/apiRequest";

export default function SingleProduct() {
    const [product, setProduct] = useState(null);
    const [isFBExtensionEnabled, setIsFBExtensionEnabled] = useState(false);
    const { id } = useParams();

    // Fetch product details
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await apiRequest(
                    `/public-products/${id}`,
                    "GET"
                );
                setProduct(response.data.data);
            } catch (error) {
                console.error("Error fetching product", error);
            }
        };
        getProduct();
    }, [id]);

    // ✅ Use window.postMessage() to communicate with the content script
    useEffect(() => {
        console.log("Checking Chrome Extension status...");

        // Send message to content script
        window.postMessage({ type: "CHECK_EXTENSION" }, "*");

        // Listen for response
        const handleMessage = (event) => {
            if (event.data.type === "EXTENSION_RESPONSE") {
                setIsFBExtensionEnabled(event.data.enabled);
                console.log("Chrome Extension Status:", event.data.enabled);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <FrontNavbar />
            <div>
                {/* {isFBExtensionEnabled ? (
                    <p>✅ Chrome Extension is enabled</p>
                ) : (
                    <p>❌ Chrome Extension is not enabled</p>
                )} */}

                {/* Todo : We Can try Communicate with Chrome Extension from here  */}
            </div>
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Product Image Section */}
                        <div className="flex justify-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Product Details Section */}
                        <div className="flex flex-col justify-between">
                            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                                {product.name}
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                {product.description}
                            </p>

                            <div className="flex items-center mb-6">
                                <span className="text-2xl font-semibold text-gray-900 mr-4">
                                    ${product.price}
                                </span>
                            </div>

                            {/* Add to Cart Section */}
                            <div className="flex items-center space-x-4 mb-8">
                                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300">
                                    Add to Cart
                                </button>
                                <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 transition-all duration-300">
                                    Buy Now
                                </button>
                                {/* Todo : We Can try Communicate with Chrome Extension from here  */}
                                {/* {isFBExtensionEnabled ? (
                                    <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 transition-all duration-300">
                                        Share Now To facebook Market Place <small>
                                            (TODO)
                                        </small>
                                    </button>
                                ) : (
                                    <p>❌ Chrome Extension is not enabled</p>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
