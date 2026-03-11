const express = require('express');
const router = express.Router();
const validateBody = require('../../middleware/validateBody');
const { createNoteSchema, updateNoteSchema } = require('../../validators/noteValidator');

// In-memory data structure to store notes
let notes = [];
let nextId = 1;

// @route    POST api/notes
// @desc     Create a new note
// @access   Public
router.post('/', validateBody(createNoteSchema), (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = {
      id: nextId++,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    notes.push(newNote);
    
    console.log(`[NOTES API] Created new note with ID: ${newNote.id}`);
    console.log(`[NOTES API] Total notes: ${notes.length}`);

    res.status(201).json(newNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/notes
// @desc     Get all notes
router.get('/', (req, res) => {
  try {
    console.log(`[NOTES API] Fetching all notes. Total: ${notes.length}`);
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/notes/:id
// @desc     Get note by ID
router.get('/:id', (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    const note = notes.find(n => n.id === noteId);

    // return 404 if note not found
    if (!note) {
      console.log(`[NOTES API] Note not found with ID: ${noteId}`);
      return res.status(404).json({ msg: 'Note not found' });
    }

    console.log(`[NOTES API] Fetched note with ID: ${noteId}`);
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/notes/:id
// @desc     Update a note
// @access   Public
router.put('/:id', validateBody(updateNoteSchema), (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex === -1) {
      console.log(`[NOTES API] Note not found for update with ID: ${noteId}`);
      return res.status(404).json({ msg: 'Note not found' });
    }

    const { title, content } = req.body;

    // Update note fields
    if (title !== undefined) notes[noteIndex].title = title;
    if (content !== undefined) notes[noteIndex].content = content;
    notes[noteIndex].updatedAt = new Date().toISOString();

    console.log(`[NOTES API] Updated note with ID: ${noteId}`);
    res.json(notes[noteIndex]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/notes/:id
// @desc     Delete a note
// @access   Public
router.delete('/:id', (req, res) => {
  try {
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex === -1) {
      console.log(`[NOTES API] Note not found for deletion with ID: ${noteId}`);
      return res.status(404).json({ msg: 'Note not found' });
    }

    const deletedNote = notes[noteIndex];
    notes.splice(noteIndex, 1);

    console.log(`[NOTES API] Deleted note with ID: ${noteId}`);
    console.log(`[NOTES API] Remaining notes: ${notes.length}`);

    res.json({ msg: 'Note deleted', note: deletedNote });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
