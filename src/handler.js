/* eslint linebreak-style: ["error", "windows"] */

const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(201);

    // response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
    // response.header('Access-Control-Allow-Origin', '*');

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code(500);

  return response;
};

// const getAllNotesHandler = () => ({
//   status: 'success',
//   data: {
//     notes,
//   },
// });

const getAllNotesHandler = (req, h) => {
  const response = h.response({
    status: 'success',
    data: {
      notes,
    },
  });

  response.code(200);
  return response;
};

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (!note) {
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      note,
    },
  });

  response.code(200);
  return response;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const {
    title,
    tags,
    body,
  } = req.payload;

  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    const response = h.response({
      status: 'failed',
      message: 'Catatan gagal diperbarui',
    });
    response.code(401);
    return response;
  }

  notes[index] = {
    ...notes[index],
    title,
    tags,
    body,
    updatedAt,
  };

  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });
  response.code(201);
  return response;
};

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    const response = h.response({
      status: 'failed',
      message: 'Catatan gagal dihapus',
    });
    response.code(401);
    return response;
  }

  notes.splice(index, 1);
  const response = h.response({
    status: 'failed',
    message: 'Catatan berhasil dihapus',
  });
  response.code(401);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
