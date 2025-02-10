import React, { useEffect, useState } from "react";
import FrontNavbar from "../partials/FrontNavbar";
import apiRequest from "../utils/apiRequest";
import ProductCard from "./partials/ProductCard";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const productList = async () => {
            try {
                setLoading(true);
                const response = await apiRequest("/public-products", "GET", true);
                setProducts(response.data.data);
            } catch (error) {
                setMessage({
                    type: "error",
                    text: "Error loading products"
                });
            } finally {
                setLoading(false);
            }
        };

        productList();
    }, []);

    return (
        <div>
            <FrontNavbar />
            <div className="flex justify-center items-center min-h-screen">
                <div className="container mx-auto p-4">
                    {message && (
                        <div
                            className={`text-center mb-4 ${
                                message.type === "error"
                                    ? "text-red-500"
                                    : "text-green-500"
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-10 text-gray-600 text-lg">
                            Data loading, please wait...
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-10 text-gray-500 text-lg">
                            No data found
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
