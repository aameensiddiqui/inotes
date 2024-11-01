import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
	const location = useLocation();
	return (
		<nav
			className="navbar navbar-expand-lg fixed-top navbar-primary bg-primary"
			style={{
				height: "70px",
				padding: "10px 30px",
				boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
				borderRadius: "0 0 10px 10px",
			}}>
			<div className="container-fluid">
				<Link
					className="navbar-brand"
					to="/"
					style={{ fontSize: "30px", color: "white", fontWeight: "bold" }}>
					iNote
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
					className="collapse navbar-collapse mx-5"
					id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/" ? "active" : ""
								}`}
								aria-current="page"
								to="/"
								style={{ fontSize: "20px", color: "white" }}>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/about" ? "active" : ""
								}`}
								to="/about"
								style={{ fontSize: "20px", color: "white" }}>
								About
							</Link>
						</li>
					</ul>
					<form className="d-flex" role="search">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
							style={{ backgroundColor: "#e9e3ff" }}
						/>
						<button className="btn btn-outline-light" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
