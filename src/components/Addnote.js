import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({
		title: "",
		description: "",
		tag: "",
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		setNote({ title: "", description: "", tag: "" });
	};
	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	return (
		<div className="container my-3" style={{ padding: "70px" }}>
			<h1>Add a note</h1>
			<form className="my-3">
				<div className="mb-3" htmlFor="title">
					<input
						style={{ border: "none", backgroundColor: "#e9e3ff" }}
						type="text"
						className="form-control"
						id="title"
						name="title"
						placeholder="Title..."
						value={note.title}
						onChange={onChange}
					/>
				</div>
				<div className="mb-3" htmlFor="description">
					<textarea
						style={{
							border: "none",
							height: "200px",
							backgroundColor: "#e9e3ff",
						}}
						className="form-control"
						placeholder="Take a note..."
						id="description"
						name="description"
						aria-multiline="true"
						value={note.description}
						onChange={onChange}></textarea>
				</div>
				<div className="mb-3" htmlFor="tag">
					<input
						style={{ border: "none", backgroundColor: "#e9e3ff" }}
						type="text"
						className="form-control"
						id="tag"
						name="tag"
						placeholder="Give a tag..."
						value={note.tag}
						onChange={onChange}
					/>
				</div>
				<button
					onClick={handleSubmit}
					type="submit"
					className="btn btn-primary"
					disabled={note.title.length < 1 || note.description.length < 1}>
					Create
				</button>
			</form>
		</div>
	);
};

export default Addnote;
