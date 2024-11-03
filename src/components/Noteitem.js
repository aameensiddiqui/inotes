import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	const { note, updateNote } = props;
	const [confirmDelete, setConfirmDelete] = useState(false);

	const handleConfirmDelete = () => {
		deleteNote(note._id);
		props.handleAlert("Deleted", "success");
		setConfirmDelete(false);
	};
	const handleCancelDelete = () => {
		setConfirmDelete(false);
	};
	const handleInitiateDelete = () => {
		setConfirmDelete(true);
	};

	return (
		<div className="col-md-11 my-3">
			<div
				className="card"
				style={{ width: "100%", border: "none", backgroundColor: "#e9e3ff" }}>
				<div className="card-body">
					<h5 className="card-title">{note.title}</h5>
					<p className="card-text" style={{ fontSize: "15px" }}>
						{note.description}
					</p>
					{note.tag ? (
						<p className="card-text" style={{ fontSize: "12px" }}>
							({note.tag})
						</p>
					) : (
						<p className="card-text">...</p>
					)}
					{/* //////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
					{confirmDelete ? (
						<>
							<i
								className="fas fa-times mx-2"
								onClick={handleCancelDelete}
								title="Cancel Delete"></i>
							<i
								className="fas fa-check mx-2"
								onClick={handleConfirmDelete}
								title="Confirm Delete"></i>
						</>
					) : (
						<>
							<i
								className="far fa-trash-alt mx-2"
								title="Delete Note"
								onClick={handleInitiateDelete}></i>
							<i
								className="far fa-edit mx-2"
								title="Update Note"
								onClick={() => {
									updateNote(note);
								}}></i>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Noteitem;
