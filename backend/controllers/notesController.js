const Note = require(`${__dirname}/../models/NoteModel`);
const { validationResult } = require('express-validator');

// ROUTE 1: Get all the notes using: GET 'api/notes/fetchallnotes". Login required
exports.fetchNotes = async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id });
        
        res.status(200).json({
            status: 'success',
            results: notes.length,
            data: {
                notes,
            },
        });

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }

}

// ROUTE 2: Add a new Note using: POST 'api/notes/addnote". Login required
exports.createNote = async (req, res) => {

    // If there are validation errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { title, description, tag } = req.body;

        // Creating a new note
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id,
        });
        
        const savedNote = await note.save();

        // Response
        res.status(201).json({
            status: 'success',
            results: 1,
            data: {
                savedNote,
            },
        });

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }

}

// ROUTE 3: Update an existing Note using: PUT 'api/notes/updatenote". Login required
exports.updateNote = async (req, res) => {

    try {

        // Create a new Note object
        const newNote = {};
        
        if (req.body.title) {
            newNote.title = req.body.title;
        }

        if (req.body.description) {
            newNote.description = req.body.description;
        }

        if (req.body.tag) {
            newNote.tag = req.body.tag;
        }

          // Find note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //Allow updation only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // Updating the note
        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );

        // Response
        res.status(200).json({
            status: 'success',
            results: 1,
            data: {
                note,
            },
        });

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }

}

// ROUTE 4: Delete an existing Note using: DELETE 'api/notes/delelenote". Login required
exports.deleteNote = async (req, res) => {

    try {

        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //Allow deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // Find note and delete from db
        note = await Note.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            results: 1,
            data: {
                note,
            },
        });


    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error");

    }

}