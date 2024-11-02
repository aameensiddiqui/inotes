import React from "react";
import Notes from "./Notes";

function Home(props) {
	const { handleAlert } = props;
	return (
		<>
			<div className="container">
				<Notes handleAlert={handleAlert} />
			</div>
		</>
	);
}

export default Home;
