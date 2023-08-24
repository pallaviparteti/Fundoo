import express from 'express';
import * as noteController from '../controllers/note.controller';

const router = express.Router();

//route to create a new note
router.post('', noteController.createNote);

//route to get all notes
router.get('', noteController.getAllNotes);

//route to delete notes by id
router.delete('/:_id', noteController.deleteNote);

export default router;
