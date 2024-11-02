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
				props.handleAlert("Incorrect Credentials.", "danger");
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
			<h1 className="my-2">Signup to use iNotes</h1>
			<form onSubmit={handleSubmitLogin}>
				<div className="mb-4 my-3" htmlFor="name">
					{/* <label htmlFor="name" className="form-label">
						Name
					</label> */}
					<input
						placeholder="Name"
						type="text"
						className="form-control"
						id="name"
						name="name"
						onChange={onChange}
						minLength={3}
						required
						style={{ border: "none", backgroundColor: "#e9e3ff" }}
					/>
				</div>
				<div className="mb-4" htmlFor="email">
					{/* <label htmlFor="email" className="form-label">
						Email
					</label> */}
					<input
						placeholder="Email"
						type="email"
						className="form-control"
						id="email"
						name="email"
						aria-describedby="emailHelp"
						onChange={onChange}
						required
						style={{ border: "none", backgroundColor: "#e9e3ff" }}
					/>
				</div>
				<div className="mb-4" htmlFor="password">
					{/* <label htmlFor="password" className="form-label">
						Password
					</label> */}
					<input
						placeholder="Password"
						type="password"
						className="form-control"
						id="password"
						name="password"
						onChange={onChange}
						minLength={5}
						required
						style={{ border: "none", backgroundColor: "#e9e3ff" }}
					/>
				</div>
				<div className="mb-4" htmlFor="cpassword">
					{/* <label htmlFor="cpassword" className="form-label">
						Confirm Password
					</label> */}
					<input
						placeholder="Confirm Password"
						type="password"
						className="form-control"
						id="cpassword"
						name="cpassword"
						onChange={onChange}
						minLength={5}
						required
						style={{ border: "none", backgroundColor: "#e9e3ff" }}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Signup
				</button>
			</form>
		</div>
	);
}

export default Signup;
