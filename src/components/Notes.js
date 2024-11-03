import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

function Notes(props) {
	// const navigate = useNavigate();
	const context = useContext(noteContext);

	const { notes, getNotes, editNote } = context;
	const { theme } = props;

	useEffect(() => {
		getNotes();
		// eslint-disable-next-line
	}, []);

	const ref = useRef(null);
	const refClose = useRef(null);

	const [note, setNote] = useState({
		id: "",
		etitle: "",
		edescription: "",
		etag: "",
	});

	const updateNote = (currentNote) => {
		if (ref.current) {
			ref.current.click();
		}
		setNote({
			id: currentNote._id,
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		});
	};

	const handleSubmit = (e) => {
		editNote(note.id, note.etitle, note.edescription, note.etag);
		refClose.current.click();
		props.handleAlert("Changes Saved", "success");
	};
	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	return (
		<>
			<Addnote handleAlert={props.handleAlert} theme={theme} />
			<button
				ref={ref}
				type="button"
				className="btn btn-primary d-none"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal">
				Launch demo modal
			</button>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div
						className="modal-content"
						style={{
							color: props.theme === "dark" ? "white" : "black",
							backgroundColor:
								props.theme === "dark" ? "rgb(43 43 48)" : "#e9e3ff",
						}}>
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="exampleModalLabel"
								style={{ color: props.theme === "dark" ? "white" : "black" }}>
								Edit Note
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								style={{
									backgroundColor: props.theme === "dark" ? "white" : "black",
								}}></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3" htmlFor="title">
									<input
										type="text"
										className={`form-control ${
											props.theme === "dark" ? "dark-theme" : "light-theme"
										}`}
										id="etitle"
										name="etitle"
										placeholder="Title"
										onChange={onChange}
										value={note.etitle}
										minLength={1}
										required
										style={{
											border: "none",
											color: props.theme === "dark" ? "white" : "black",
											backgroundColor:
												props.theme === "dark" ? "rgb(86 86 86)" : "#e9e3ff",
										}}
									/>
								</div>
								<div className="mb-3" htmlFor="description">
									<textarea
										className={`form-control ${
											props.theme === "dark" ? "dark-theme" : "light-theme"
										}`}
										placeholder="Take a note..."
										id="edescription"
										name="edescription"
										aria-multiline="true"
										onChange={onChange}
										value={note.edescription}
										minLength={1}
										style={{
											border: "none",
											color: props.theme === "dark" ? "white" : "black",
											backgroundColor:
												props.theme === "dark" ? "rgb(86 86 86)" : "#e9e3ff",
										}}
										required></textarea>
								</div>
								<div className="mb-3" htmlFor="tag">
									<input
										type="text"
										className={`form-control ${
											props.theme === "dark" ? "dark-theme" : "light-theme"
										}`}
										id="etag"
										name="etag"
										placeholder="Enter a tag..."
										onChange={onChange}
										value={note.etag}
										style={{
											border: "none",
											color: props.theme === "dark" ? "white" : "black",
											backgroundColor:
												props.theme === "dark" ? "rgb(86 86 86)" : "#e9e3ff",
										}}
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								ref={refClose}>
								Close
							</button>
							<button
								type="button"
								className={`btn btn-${
									props.theme === "dark" ? "info" : "primary"
								}`}
								onClick={handleSubmit}
								disabled={
									note.etitle.length < 1 || note.edescription.length < 1
								}>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				className="container-fluid mx-5 row"
				style={{ color: props.theme === "dark" ? "white" : "black" }}>
				<h2>Your Notes</h2>
				{notes.length === 0 && "No notes to show here..."}
				{notes
					.slice()
					.reverse()
					.map((note) => {
						return (
							<Noteitem
								key={note._id}
								updateNote={updateNote}
								note={note}
								handleAlert={props.handleAlert}
								theme={theme}
							/>
						);
					})}
			</div>
		</>
	);
}

export default Notes;
