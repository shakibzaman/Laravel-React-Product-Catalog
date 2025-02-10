import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../utils/apiRequest";

export default function EditProduct() {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const id = useParams().id;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        image: null,
    });

    // Handle input changes for text and number fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file);
        setFormData({ ...formData, image: file });
    };

    // Fetch product details when component mounts
    useEffect(() => {
        const productList = async () => {
            try {
                setLoading(true);
                setMessage(null);

                const response = await apiRequest("/products/" + id, "GET");

                // Ensure the response data is correctly structured
                if (response.data && response.data.data) {
                    setFormData(response.data.data);
                } else {
                    console.error("Invalid API response structure:", response);
                }
            } catch (error) {
                console.error("Error fetching product:", error); // Log the error
                setMessage(error.message || "Error fetching product");
            } finally {
                setLoading(false);
            }
        };
        productList();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const formDataToSend = new FormData();

            // Append all fields to FormData
            Object.keys(formData).forEach((key) => {
                if (key === "image" && formData[key] instanceof File) {
                    // Append the file if it exists
                    formDataToSend.append(key, formData[key]);
                    console.log(`Appended ${key}:`, formData[key]);
                } else {
                    // Append other fields (including empty or null values)
                    formDataToSend.append(key, formData[key] || ""); // Use empty string for null/undefined
                    console.log(`Appended ${key}:`, formData[key] || "");
                }
            });

            // Convert FormData to a plain object for debugging
            const formDataObject = {};
            for (let pair of formDataToSend.entries()) {
                formDataObject[pair[0]] = pair[1];
            }

            console.log("formDataToSend as plain object:", formDataObject);

            // Debugging: Log FormData contents
            console.log("FormData contents:");
            for (let pair of formDataToSend.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            // Send the request
            const response = await apiRequest(
                `/products/${id}`,
                "POST",
                formDataToSend,
                true // Indicate that this is a FormData request
            );

            if (response.success) {
                setMessage({
                    type: "success",
                    text: "Product successfully updated!",
                });
                setTimeout(() => navigate("/product-list"), 2000);
            } else {
                setMessage({ type: "error", text: response.message });
            }
        } catch (error) {
            console.error("Error updating product:", error);
            setMessage({
                type: "error",
                text: "Failed to update product. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 mt-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Edit Product
                </h2>

                {/* Display Message */}
                {message && (
                    <div
                        className={`mb-4 p-2 text-sm rounded ${
                            message.type === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Stock Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="stock_quantity"
                            value={formData.stock_quantity}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Product Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <span>
                        <b> Current Image </b>
                    </span>
                    <img
                        src={formData.image}
                        alt="Product image"
                        className="product-image"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="primary-btn mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {loading ? "Updating... Please wait" : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}
