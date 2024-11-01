const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// ROUTE 1: add a new note corresponding to the user using: GET "/api/notes/addnote". Login required.
router.post(
	"/addnote",
	fetchuser,
	[
		body("title", "Title required.").isLength({ min: 1 }),
		body("description", "Description required.").isLength({ min: 1 }),
	],
	async (req, res) => {
		try {
			// using destructuring method of javascript
			const { title, description, tag } = req.body;
			// if there are any errors...
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).send({ errors: errors.array() });
			}
			// if there are no errors, create a new Notes object
			const note = Notes({
				title,
				description,
				tag,
				user: req.user.id,
			});
			// save it
			note.save();
			// send a json response of that note
			res.json(note);
		} catch (e) {
			res.status(500).send("Internal Server Error.");
		}
	}
);

// ROUTE 2: fetch all the notes using: POST "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
	try {
		// find all the notes corresponding to that user
		const notes = await Notes.find({ user: req.user.id });
		res.json(notes);
	} catch (e) {
		res.status(500).send("Internal Server Error.");
	}
});

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
	try {
		// destructuring
		const { title, description, tag } = req.body;
		// create a newNote empty obj
		const newNote = {};
		// if these exists, change newNote's things to new ones
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}
		// find the note to be updated
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).send("note not found");
		}
		// check if note's user if is same as the user who is updating by "ID". if not don't allow him
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("not allowed");
		}
		// by using findByIdAndUpdate
		note = await Notes.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);
		res.json(note);
	} catch (e) {
		res.status(500).send("Internal Server Error.");
	}
});

// ROUTE 4: find note by ID and delete it using: DELETE "/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
	try {
		// find note to be deleted
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).send("note not found");
		}
		// check id note's user is same as the user who is deleting the note by "ID". if not don't allow him
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("not allowed");
		}
		// delete the note
		note = await Notes.findByIdAndDelete(req.params.id);
		res.json({ success: "note has been deleted", note: note });
	} catch (e) {
		res.status(500).send("Internal server error");
	}
});
module.exports = router;
