import React from "react";

function Alert(props) {
	// if (!props.alert) return null;

	const capitalizeS = (word) => {
		if (word === "danger") {
			word = "error";
		}
		let s = word.toLowerCase();
		return s.charAt(0).toUpperCase() + s.slice(1);
	};

	return (
		<div style={{ height: "1px" }}>
			{props.alert && (
				<div
					className={`alert alert-${props.alert.type} alert-dismissible fade show`}
					role="alert"
					style={{
						width: "100%",
						zIndex: 1000,
					}}>
					<strong>{capitalizeS(props.alert.type)}</strong> : {props.alert.msg}
				</div>
			)}
		</div>
	);
}

export default Alert;
