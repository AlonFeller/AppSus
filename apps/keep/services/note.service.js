import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const NoteService = {
    getById,
    query,
    saveKeep: saveNote,
    remove,
    getTypes,
    getNextNoteId
}

const KEY = 'notesDB'
var gTypes = ['txt', 'img', 'video', 'todo', 'audio', 'canvas', 'map']

function query(filterBy) {
    let Notes = _loadFromStorage()
    if (!Notes) {
        Notes = _createNotes()
        _saveToStorage(Notes)
    }

    if (filterBy) {
        let { type, minSpeed, maxSpeed } = filterBy
        if (!minSpeed) minSpeed = 0;
        if (!maxSpeed) maxSpeed = Infinity
        Notes = Notes.filter(Note =>
            Note.type.includes(type) &&
            Note.speed <= maxSpeed &&
            Note.speed >= minSpeed)
    }

    return Promise.resolve(Notes)
}

function getNextNoteId(noteId) {
    const notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => noteId === note.id)
    const nextNoteIdx = (noteIdx + 1 === notes.length) ? 0 : noteIdx + 1
    return notes[nextNoteIdx].id
}

function getById(NoteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => NoteId === note.id)
    return Promise.resolve(note)
}

function remove(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function saveNote(note) {
    if (note.id) return _update(note)
    else return _add(note)
}

function _add(noteToAdd) {
    let notes = _loadFromStorage()
    const note = _createCar(noteToAdd.type, noteToAdd.speed)
    notes = [note, ...notes]
    _saveToStorage(notes)
    return Promise.resolve()
}

function _update(noteToUpdate) {
    let notes = _loadFromStorage()
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    _saveToStorage(notes)
    return Promise.resolve()
}

function getTypes() {
    return gTypes
}

function _createNote(type) {
    let note = {
        id: utilService.makeId(),
        type,
        info: {},
        isPinned: (utilService.getRandomIntInclusive(0, 10) > 5) ? true : false,

    }
    if (type === 'txt') note.info.desc = utilService.makeLorem(25)
    if (type === 'img') {
        note.info = {
            url: `../../../assets/img/${utilService.getRandomIntInclusive(1 , 5)}.jpg`,
            title: utilService.makeLorem(3)
        }
    }

    return note
}

function _createNotes() {
    const notes = []
    for (let i = 0; i < 20; i++) {
        const type = gTypes[utilService.getRandomIntInclusive(0, gTypes.length - 1)]
        notes.push(_createNote(type))
    }
    console.table(notes);
    return notes
}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}


const gNotes = [{
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fullstack Me Baby!" }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [{
                    txt: "Driving liscence",
                    doneAt: null
                },
                {
                    txt: "Coding power",
                    doneAt: 187111111
                }
            ]
        }
    }
];