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
var gTypes = ['txt', 'img', 'todo']
    // , 'audio', 'canvas','video', 'map' to be continued


function query(filterBy) {
    let Notes = _loadFromStorage()
    if (!Notes) {
        Notes = _createNotes()
        _saveToStorage(Notes)
    }

    if (filterBy) {
        let { search } = filterBy
        Notes = Notes.filter(note => {
            return note.type.toLowerCase().includes(search.toLowerCase()) ||
                (note.desc && note.desc.toLowerCase().includes(search.toLowerCase()))
        })
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

function getTypes() {
    return gTypes
}

function _createNote(type) {
    let note = {
        id: utilService.makeId(),
        type,
        isPinned: (utilService.getRandomIntInclusive(0, 10) > 5) ? true : false,
        desc: null,
        info: {
            url: null,
            title: null,
            todos: [{
                txt: null,
                doneAt: null,
                isChecked: false
            }]
        }

    }
    if (type === 'txt') note.desc = utilService.makeLorem(25)
    if (type === 'img') {
        note.info = {
            url: `../../../assets/img/${utilService.getRandomIntInclusive(1, 5)}.jpg`,
            title: utilService.makeLorem(3)
        }
    }
    if (type === 'video') {
        note.info = {
            url: "https://www.youtube.com/embed/yLTnRPoP2OM",
            title: "YouTube video player"
        }
    }
    if (type === 'todo') {
        note.info = {
            todos: [{ txt: "Driving license", doneAt: null, isChecked: false },
                { txt: "Coding power", doneAt: 187111111, isChecked: false }
            ]

        }
    }
    return note
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