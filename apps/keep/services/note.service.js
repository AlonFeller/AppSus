import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const NoteService = {
    getById,
    query,
    saveNote,
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

function saveNote({ note }) {
    console.log(note);
    if (note.id) {
        _update(note)
    } else _add(note)
    return query()
}

function getTypes() {
    return gTypes
}

function _createNote(note) {
    console.log(note);
    if (note.id) {
        note.id = utilService.makeId()
        console.log(note);
        if (note.desc.includes('jpg')) {
            note.info = {
                url: note.desc,
            }
            note.type = 'img'
        }
        if (note.desc.includes('url')) {
            note.info = {
                url: note.desc,
            }
            newNote.type = 'video'
        }
        if (note.desc.includes('todo')) {
            note.info = {
                todos: [{ txt: utilService.makeLorem(2), doneAt: utilService.getDate(), isChecked: false },
                    { txt: utilService.makeLorem(2), doneAt: utilService.getDate(), isChecked: false }
                ]

            }
            note.type = 'todo'
        }
        return note
    }
    let newNote = {
        id: utilService.makeId(),
        type: 'txt',
        doneAt: utilService.getDate(),
        isPinned: false,
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
    if (newNote.type === 'txt') newNote.desc = utilService.makeLorem(25)
    if (newNote.type === 'img') {
        newNote.info = {
            url: `../../../assets/img/${utilService.getRandomIntInclusive(1, 15)}.jpg`,
            title: utilService.makeLorem(3)
        }
    }
    if (newNote.type === 'video') {
        newNote.info = {
            url: "https://www.youtube.com/embed/yLTnRPoP2OM",
            title: "YouTube video player"
        }
    }
    if (newNote.type === 'todo') {
        newNote.info = {
            todos: [{ txt: utilService.makeLorem(3), doneAt: utilService.getDate(), isChecked: false },
                { txt: utilService.makeLorem(3), doneAt: utilService.getDate(), isChecked: false }
            ]

        }
    }
    return newNote
}

function _add(noteToAdd) {
    console.log(noteToAdd);
    let notes = _loadFromStorage()
    const note = _createNote(noteToAdd)
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