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

function App() {
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
				<Navbar />
				<Alert alert={alertMsg} />
				<Routes>
					<Route path="/" element={<Home handleAlert={handleAlert} />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login handleAlert={handleAlert} />} />
					<Route
						path="/signup"
						element={<Signup handleAlert={handleAlert} />}
					/>
				</Routes>
			</Router>
		</NoteState>
	);
}

export default App;
