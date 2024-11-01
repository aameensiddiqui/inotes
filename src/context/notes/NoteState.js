import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const host = "http://localhost:5000";
	const notesInitial = [];
	const [notes, setNotes] = useState(notesInitial);

	// fetch all notes from database
	const getNotes = async () => {
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxZmExNDVhODJkMjUyMjBiYmQxMTM3In0sImlhdCI6MTczMDEyNjE0OX0.hrVKBoZYu6iYCdUatw2S1atwW6IDp6F0_9n0_mD5-uU",
			},
		});
		const json = await response.json();
		setNotes(json);
	};

	// Add a Note
	const addNote = async (title, description, tag) => {
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxZmExNDVhODJkMjUyMjBiYmQxMTM3In0sImlhdCI6MTczMDEyNjE0OX0.hrVKBoZYu6iYCdUatw2S1atwW6IDp6F0_9n0_mD5-uU",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const note = await response.json();
		setNotes(notes.concat(note));
	};

	// Delete a Note
	const deleteNote = async (id) => {
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxZmExNDVhODJkMjUyMjBiYmQxMTM3In0sImlhdCI6MTczMDEyNjE0OX0.hrVKBoZYu6iYCdUatw2S1atwW6IDp6F0_9n0_mD5-uU",
			},
		});
		const json = await response.json();
		// console.log(json);
		const n = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(n);
	};

	// Edit a Note
	const editNote = async (id, title, description, tag) => {
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxZmExNDVhODJkMjUyMjBiYmQxMTM3In0sImlhdCI6MTczMDEyNjE0OX0.hrVKBoZYu6iYCdUatw2S1atwW6IDp6F0_9n0_mD5-uU",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const json = await response.json();
		// console.log(json);
		let newNotes = JSON.parse(JSON.stringify(notes));
		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	};

	return (
		<NoteContext.Provider
			value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
			{props.children}
		</NoteContext.Provider>
	);
};
export default NoteState;
