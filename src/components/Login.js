import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	let navigate = useNavigate();

	const handleSubmitLogin = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			localStorage.setItem("token", json.authtoken);
			navigate("/");
			props.handleAlert("Logged in Successfully", "success");
		} else {
			props.handleAlert("Invalid Credentials", "danger");
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
				Login to continue
			</h1>
			<form onSubmit={handleSubmitLogin}>
				<div className="mb-4 my-3" htmlFor="email">
					{/* <label htmlFor="email" className="form-label">
						Email
					</label> */}
					<input
						type="email"
						placeholder="Email"
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
					{/* <label htmlFor="password" className="form-label">
						Password
					</label> */}
					<input
						type="password"
						placeholder="Password"
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
				<button
					type="submit"
					className={`btn btn-${props.theme === "dark" ? "info" : "primary"}`}>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
