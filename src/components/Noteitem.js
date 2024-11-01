import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	const { note, updateNote } = props;

	return (
		<div className="col-md-3 my-3">
			<div
				className="card"
				style={{ width: "18rem", border: "none", backgroundColor: "#e9e3ff" }}>
				<div className="card-body">
					<h5 className="card-title">{note.title}</h5>
					<p className="card-text">{note.description}</p>
					<p className="card-text">{note.tag}</p>
					<i
						className="far fa-trash-alt mx-2"
						onClick={() => {
							deleteNote(note._id);
						}}></i>
					<i
						className="far fa-edit mx-2"
						onClick={() => {
							updateNote(note);
						}}></i>
				</div>
			</div>
		</div>
	);
}

export default Noteitem;
