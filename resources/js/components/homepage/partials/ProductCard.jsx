import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    // Function to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="p-4">
                <h2>{product.name}</h2>
                <p>{truncateText(product.description, 100)}</p>
                <div className="price-button-container">
                    <span className="price">${product.price}</span>
                    <Link
                        to={`/product-view/${product.id}`}
                        className="add-to-cart"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}
