import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated";
import Homepage from "./components/homepage/Home";
import SingleProduct from "./components/homepage/SingleProduct";
import CreateProduct from "./components/products/CreateProduct";
import EditProduct from "./components/products/EditProduct";
import ProductList from "./components/products/List";
import List from "./components/users/List";
import Register from "./components/users/Register";

// ✅ Define public routes
const publicRoutesConfig = [
    { path: "/", element: <Homepage /> },
    { path: "/product-view/:id", element: <SingleProduct /> },
    {
        path: "/login",
        element: (
            <RedirectIfAuthenticated>
                <Login />
            </RedirectIfAuthenticated>
        ),
    },
];

// ✅ Define authenticated routes
const authRoutesConfig = [
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/user-list",
        element: (
            <ProtectedRoute>
                <List />
            </ProtectedRoute>
        ),
    },
    {
        path: "/product-list",
        element: (
            <ProtectedRoute>
                <ProductList />
            </ProtectedRoute>
        ),
    },
    {
        path: "/create-product",
        element: (
            <ProtectedRoute>
                <CreateProduct />
            </ProtectedRoute>
        ),
    },
    {
        path: "/edit-product/:id",
        element: (
            <ProtectedRoute>
                <EditProduct />
            </ProtectedRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <ProtectedRoute>
                <Register />
            </ProtectedRoute>
        ),
    },
];

// ✅ Convert routes to <Route /> elements for rendering
export const publicRoutes = publicRoutesConfig.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
));

export const authRoutes = authRoutesConfig.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
));

// ✅ Extract only public route paths for authentication checks
export const publicRoutePaths = publicRoutesConfig.map((route) => route.path);
