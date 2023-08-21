
const notes = require('express').Router();
const uuid = require('../helpers/uuid');

// Import helper functions from fsUtils file
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fs');

// This API route is a GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

notes.get('/:id', (req, res) => {
    console.info(`${req.method} request received to get a single note`);
    const noteId = (req.params.id).toLowerCase();
    readFromFile('./db/db.json')
        .then((data) => {
            let noteData = JSON.parse(data);
            // Find note with matching ID
            const note = noteData.find((note) => note.id === noteId);

            if (note) {
                res.json(note);
            } else {
                res.status(404).json({error: 'Note not found'});
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Server error'});
        });

});

// This API route is a POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });