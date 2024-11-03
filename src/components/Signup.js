import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
	let navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		cpassword: "",
	});

	const handleSubmitLogin = async (e) => {
		const { name, email, password, cpassword } = credentials;
		e.preventDefault();
		if (cpassword === password) {
			const response = await fetch(
				"http://localhost:5000/api/auth/createuser",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						email,
						password,
					}),
				}
			);
			const json = await response.json();
			console.log(json);
			if (json.success) {
				localStorage.setItem("token", json.authtoken);
				navigate("/login");
				props.handleAlert("Account Created Successfully", "success");
			} else {
				props.handleAlert(
					"Email already in use. Use a different email",
					"danger"
				);
			}
		} else {
			props.handleAlert("Passwords do not match", "danger");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div className="container my-1" style={{ padding: "70px" }}>
			<h1
				className="my-2"
				style={{ color: props.theme === "dark" ? "white" : "black" }}>
				Create a new account
			</h1>
			<form onSubmit={handleSubmitLogin}>
				<div className="mb-4 my-3" htmlFor="name">
					<input
						placeholder="Name"
						type="text"
						className={`form-control ${
							props.theme === "dark" ? "dark-theme" : "light-theme"
						}`}
						id="name"
						name="name"
						onChange={onChange}
						minLength={3}
						required
						style={{
							border: "none",
							color: props.theme === "dark" ? "white" : "black",
							backgroundColor:
								props.theme === "dark" ? "rgb(86 86 86)" : "#e9e3ff",
						}}
					/>
				</div>
				<div className="mb-4" htmlFor="email">
					<input
						placeholder="Email"
						type="email"
						className={`form-control ${
							props.theme === "dark" ? "dark-theme" : "light-theme"
						}`}
						id="email"
						name="email"
						aria-describedby="emailHelp"
						onChange={onChange}
						required
						style={{
							border: "none",
							color: props.theme === "dark" ? "white" : "black",
							backgroundColor:
								props.theme === "dark" ? "rgb(86 86 86)" : "#e9e3ff",
						}}
					/>
				</div>
				<div className="mb-4" htmlFor="password">
					<input
						placeholder="Password"
						type="password"
						className={`form-control ${
							props.theme === "dark" ? "dark-theme" : "light-theme"
						}`}
						id="password"
						name="password"
						onChange={onChange}
						minLength={5}
						required
						style={{
							border: "none",
							color: props.theme === "dark" ? "white" : "black",
							backgroundColor:
								props.theme === "dark" ? "rgb(86 86 86)" : "#e9e3ff",
						}}
					/>
				</div>
				<div className="mb-4" htmlFor="cpassword">
					<input
						placeholder="Confirm Password"
						type="password"
						className={`form-control ${
							props.theme === "dark" ? "dark-theme" : "light-theme"
						}`}
						id="cpassword"
						name="cpassword"
						onChange={onChange}
						minLength={5}
						required
						style={{
							border: "none",
							color: props.theme === "dark" ? "white" : "black",
							backgroundColor:
								props.theme === "dark" ? "rgb(86 86 86)" : "#e9e3ff",
						}}
					/>
				</div>
				<button
					type="submit"
					className={`btn btn-${props.theme === "dark" ? "info" : "primary"}`}>
					Signup
				</button>
			</form>
		</div>
	);
}

export default Signup;
