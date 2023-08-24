import Note from '../models/note.model';


// create new note.
export const createNote = async (body) => {
  const data = await Note.create(body);
  return data;
};

// Get all Notes
export const getAllNotes = async (body) => {
  const data = await Note.find({ createdBy: body.createdBy });
  return data;
};
