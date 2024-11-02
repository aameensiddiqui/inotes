import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-primary bg-primary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/" style={{ color: "white" }}>
					iNotes
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse mx-3"
					id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/" ? "active" : ""
								}`}
								aria-current="page"
								to="/"
								style={{ color: "white" }}>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/about" ? "active" : ""
								}`}
								to="/about"
								style={{ color: "white" }}>
								About
							</Link>
						</li>
					</ul>
					{!localStorage.getItem("token") ? (
						<div>
							<Link
								className="btn btn-outline-light mx-1"
								role="button"
								aria-disabled="true"
								to="/login">
								Login
							</Link>
							<Link
								className="btn btn-outline-light mx-1"
								role="button"
								aria-disabled="true"
								to="/signup">
								Signup
							</Link>
						</div>
					) : (
						<button className="btn btn-outline-light" onClick={handleLogout}>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
