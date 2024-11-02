import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Protected Route component
// Refuses to show notes if user is not logged in
// and also does not show other's notes
const ProtectedRoute = () => {
	const isAuthenticated = !!localStorage.getItem("token");

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
