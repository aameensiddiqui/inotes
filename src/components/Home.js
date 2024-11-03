import React from "react";
import Notes from "./Notes";

function Home(props) {
	const { handleAlert, theme } = props;
	return (
		<>
			<div className="container">
				<Notes handleAlert={handleAlert} theme={theme} />
			</div>
		</>
	);
}

export default Home;
