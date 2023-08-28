import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as noteController from '../controllers/note.controller';

const router = express.Router();

//route to create a new note
router.post('', userAuth, noteController.createNote);

//route to get all notes
router.get('', userAuth, noteController.getAllNotes);

//route to delete notes by id
router.delete('/:_id', userAuth, noteController.deleteNote);

// router to update note by id
router.put('/:_id', userAuth, noteController.updateNoteById);

//get note by id
router.get('/:_id', userAuth, noteController.getNoteById);

//route to archive Note
router.put('/archive/:_id', userAuth, noteController.noteArchive);

//route to trash Note
router.put('/trash/:_id', userAuth, noteController.noteTrash );

export default router;
