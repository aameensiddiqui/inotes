import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Alert from "./components/Alert";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const [theme, setTheme] = useState("primary");
	const handleChangeTheme = () => {
		if (theme === "dark") {
			document.body.style.backgroundColor = "white";
			setTheme("primary");
		} else {
			document.body.style.backgroundColor = "rgb(43 43 48)";
			setTheme("dark");
		}
	};
	const [alertMsg, setAlertMsg] = useState(null);

	const handleAlert = (message, type) => {
		setAlertMsg({
			msg: message,
			type: type,
		});
		setTimeout(() => {
			setAlertMsg(null);
		}, 2000);
	};

	return (
		<NoteState>
			<Router>
				<Navbar theme={theme} handleChangeTheme={handleChangeTheme} />
				<Alert alert={alertMsg} />
				<Routes>
					<Route element={<ProtectedRoute handleAlert={handleAlert} />}>
						<Route
							path="/"
							element={<Home handleAlert={handleAlert} theme={theme} />}
						/>
					</Route>
					<Route path="/about" element={<About theme={theme} />} />
					<Route
						path="/login"
						element={<Login handleAlert={handleAlert} theme={theme} />}
					/>
					<Route
						path="/signup"
						element={<Signup handleAlert={handleAlert} theme={theme} />}
					/>
				</Routes>
			</Router>
		</NoteState>
	);
}

export default App;
