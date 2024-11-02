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
				style={{ width: "14rem", border: "none", backgroundColor: "#e9e3ff" }}>
				<div className="card-body">
					<h4 className="card-title">{note.title}</h4>
					<p className="card-text" style={{ fontSize: "19px" }}>
						{note.description}
					</p>
					{note.tag ? (
						<p className="card-text">({note.tag})</p>
					) : (
						<p className="card-text">{note.tag}</p>
					)}

					<i
						className="far fa-trash-alt mx-2"
						onClick={() => {
							deleteNote(note._id);
							props.handleAlert("Deleted", "success");
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
