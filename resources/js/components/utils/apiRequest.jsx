export default async function apiRequest(
    endpoint,
    method = "GET",
    body = null,
    isFormData = false
) {
    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

    const token = localStorage.getItem("token");

    const config = {
        method,
        headers: {
            Authorization: token ? `Bearer ${token}` : "", // Add the Bearer token if it exists
        },
    };

    // **Remove Content-Type header for FormData (browser sets it automatically)**
    if (!isFormData) {
        config.headers["Content-Type"] = "application/json";
    }

    // **Assign body correctly**
    if (body && (method === "POST" || method === "PUT")) {
        config.body = isFormData ? body : JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Server Error Response:", errorText);
            throw new Error(errorText || "Something went wrong");
        }

        const data = await response.json();

        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
}
