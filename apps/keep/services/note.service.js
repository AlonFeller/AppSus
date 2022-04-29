import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const NoteService = {
    getById,
    query,
    saveKeep: saveNote,
    remove,
    getTypes,
    pin
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


function getById(NoteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => NoteId === note.id)
    return Promise.resolve(note)
}

function remove({ note }) {
    let notes = _loadFromStorage()
    let noteId = note.id
    notes = notes.filter(note, noteId => noteId !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function pin(noteId) {
    let note = getById(noteId)
    note.isPinned = (!note.isPinned) ? true : false
    _update(note)
    console.log(note);
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
        doneAt: utilService.getDate(),
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
            url: `../../../assets/img/${utilService.getRandomIntInclusive(1, 15)}.jpg`,
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
            todos: [{ txt: utilService.makeLorem(3), doneAt: utilService.getDate(), isChecked: false },
                { txt: utilService.makeLorem(3), doneAt: utilService.getDate(), isChecked: false }
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
    for (let i = 0; i < 35; i++) {
        const type = gTypes[utilService.getRandomIntInclusive(0, gTypes.length - 1)]
        notes.push(_createNote(type))
    }
    return notes
}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}