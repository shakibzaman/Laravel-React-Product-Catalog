import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../utils/apiRequest";

export default function List() {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const handleDeleteProduct = async (id) => {
        try {
            const response = await apiRequest("/products/" + id, "DELETE");
            if (response.data.status === 200) {
                setMessage({
                    type: "success",
                    text: "Product successfully deleted!",
                });
                setTimeout(() => navigate("/product-list"), 2000);
            } else {
                setMessage({ type: "error", text: "Error Deleting Product" });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "Failed to Delete product. Please try again.",
            });
        }

        setLoading(false);
    };
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    useEffect(() => {
        const productList = async () => {
            try {
                setLoading(true);
                setMessage(null);

                const response = await apiRequest("/products", "GET");
                setProducts(response.data.data);
            } catch (error) {
                setMessage(error.message || "Error faching products");
            } finally {
                setLoading(false);
            }
        };
        productList();
    }, []);

    return (
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
                <Link className="button primary-btn" to="/create-product">
                    Add Product
                </Link>
                <h3 className="text-center w-full">Products List</h3>

                {loading ? (
                    <div className="text-center py-10 text-gray-600 text-lg">
                        Please wait...
                    </div>
                ) : (
                    <table className="table-auto border-collapse border border-gray-300 text-center w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Stock Quantity</th>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-4 py-10 text-center text-gray-500 text-lg"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="border px-4 py-2">
                                            {product.id}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {product.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {truncateText(
                                                product.description,
                                                100
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {product.price}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {product.stock_quantity}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <img
                                                src={product.image}
                                                alt="Product image"
                                                className="product-image"
                                            />
                                        </td>
                                        <td>
                                            <div className="flex gap-2 justify-center">
                                                <Link
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-sm font-medium"
                                                    to={`/edit-product/${product.id}`}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            product.id
                                                        )
                                                    }
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
