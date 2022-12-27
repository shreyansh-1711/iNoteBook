const express = require('express');
const router = express.Router();
const Note = require('../model/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');


// Route-1 Gett all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error occured");
    }

})


// Route-1 Add a New Note using POST /api/auth/addnote 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atlast 5 charcater').isLength({ min: 5 }),
], async (req, res) => {
    try {
        console.log(res.body);
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error occured");
    }


})


// Route-3 Update the existing Note
router.put('/updatenote/:id', fetchuser,  async (req, res) => {
    const { title, description, tag } = req.body;
    // create new note 
    const newNote = {};
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};
    if(tag) {newNote.tag = tag};

    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() != req.user.id ){
        return res.status(401).send("Not Allowed")
    }
    
    note = await Note.findByIdAndUpdate(req.params.id , {$set: newNote}, {new: true})
    res.json({note})
})
module.exports = router