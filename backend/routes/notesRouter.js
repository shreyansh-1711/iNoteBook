const express = require("express");
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);
const { body } = require("express-validator");
const notesController = require(`${__dirname}/../controllers/notesController`);

const router = express.Router();

// ROUTE 1: Get all the notes using: GET 'api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, notesController.fetchNotes);

// ROUTE 2: Add a new Note using: POST 'api/notes/addnote". Login required
router.post("/addnote", fetchUser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body(
            "description",
            "Description must be atleast 5 characters"
        ).isLength({ min: 5 }),
    ], notesController.createNote);

// ROUTE 3: Update an existing Note using: PUT 'api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchUser, notesController.updateNote);

// ROUTE 4: Delete an existing Note using: DELETE 'api/notes/delelenote". Login required
router.delete("/deletenote/:id", fetchUser, notesController.deleteNote);

module.exports = router;