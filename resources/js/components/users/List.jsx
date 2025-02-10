import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "./../utils/apiRequest";

export default function List() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const userList = async () => {
            setLoading(true);
            setMessage(null);

            try {
                const response = await apiRequest("/users", "GET");
                if (response.success) {
                    setUsers(response.data.users); 
                } else {
                    setMessage(response.message); 
                }
            } catch (error) {
                setMessage(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        userList();
    }, []); // Empty dependency array, so this runs only once when the component mounts

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="container mx-auto p-4">
                {message && (
                    <div className="text-red-500 text-center mb-4">
                        {message}
                    </div>
                )}
                <Link className="button primary-btn" to="/register">
                    Add User
                </Link>
                <h3 className="text-center w-full">User List</h3>
                <table className="table-auto border-collapse border border-gray-300 text-center w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Join Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.id}</td>
                                <td className="border px-4 py-2">
                                    {user.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.email}
                                </td>
                                <td className="border px-4 py-2">
                                    {user.created_at}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
