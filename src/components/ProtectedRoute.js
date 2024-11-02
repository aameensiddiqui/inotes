import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Protected Route component
// Refuses to show notes if user is not logged in
// and also does not show other's notes
const ProtectedRoute = ({ handleAlert }) => {
	const isAuthenticated = !!localStorage.getItem("token");

	useEffect(() => {
		if (!isAuthenticated) {
			handleAlert("Login first.", "warning");
		}
		// The dependencies ensure this effect runs only when authentication status or handleAlert changes
	}, [isAuthenticated, handleAlert]);

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
