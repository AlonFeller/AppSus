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
let gTypes = ['txt', 'img', 'todo']
    // , 'audio', 'canvas','video', 'map' to be continued


function query(filterBy) {

    let notes = _loadFromStorage()
    if (!notes || !notes.length) {
        notes = _createNotes()
        _saveToStorage(notes)
    }
    if (filterBy) {
        let { search } = filterBy
        notes = notes.filter(note => {
            return note.type.toLowerCase().includes(search.toLowerCase()) ||
                (note.desc && note.desc.toLowerCase().includes(search.toLowerCase()))
        })
    }

    return Promise.resolve(notes)
}


function getById(NoteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => NoteId === note.id)
    return Promise.resolve(note)
}

function remove(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter((note) => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function pin(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    let elNote = document.getElementsByClassName(noteId)
    console.log(elNote);
    if (!note.isPinned) {
        note.isPinned = !note.isPinned
        elNote.classList.add("pinned")

    } else {
        note.isPinned = !note.isPinned
        elNote.classList.remove("pinned")
    }
    return Promise.resolve()
}

function saveNote(note) {
    console.log(note);
    if (note.id) {
        _update(note)
    } else _add(note)
    return query()
}

function _createNote(note) {
    note.id = utilService.makeId()
    if (note.desc.includes('jpg')) {
        console.log("working on an image here");
        note.info = {
            url: note.desc,
        }
        note.type = 'img'
    } else if (note.desc.includes('url')) {
        note.info = {
            url: note.desc,
        }
        newNote.type = 'video'
    } else {
        note.type = 'txt'
    }
    console.log('note to add', note);
    return note
}

function getTypes() {
    return gTypes
}

function _add(noteToAdd) {
    let notes = _loadFromStorage()
    const note = _createNote(noteToAdd)
    notes.push(note)
    _saveToStorage(notes)
    return Promise.resolve()
}

function _update(noteToUpdate) {
    let notes = _loadFromStorage()
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    _saveToStorage(notes)
    return Promise.resolve()
}

function _saveToStorage(notes) {
    console.log('notes before save', notes);
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function _createNotes() {
    return [{
        id: utilService.makeId(),
        type: "txt",
        doneAt: "28/04/2022",
        isPinned: false,
        desc: "This is the thing I hate the most",
        info: {
            url: null,
            title: null,
            todos: [{
                txt: null,
                doneAt: null,
                isChecked: false
            }]
        }
    }, {
        id: utilService.makeId(),
        type: "todo",
        doneAt: "01/05/2022",
        isPinned: false,
        desc: null,
        info: {
            url: null,
            title: null,
            todos: [{
                txt: "Finish this sprint",
                doneAt: "01/05/2022",
                isChecked: false
            }, {
                txt: "walk the dog",
                doneAt: "01/05/2022",
                isChecked: false
            }]
        }
    }, {
        id: utilService.makeId(),
        type: "img",
        doneAt: utilService.getDate(),
        isPinned: false,
        desc: null,
        info: {
            url: `../../../assets/img/4.jpg`,
            title: null,
            todos: [{
                txt: null,
                doneAt: null,
                isChecked: false
            }]
        }
    }, {
        id: utilService.makeId(),
        type: "img",
        doneAt: utilService.getDate(),
        isPinned: false,
        desc: null,
        info: {
            url: `../../../assets/img/2.jpg`,
            title: null,
            todos: [{
                txt: null,
                doneAt: null,
                isChecked: false
            }]
        }
    }, {
        id: utilService.makeId(),
        type: "img",
        doneAt: utilService.getDate(),
        isPinned: false,
        desc: null,
        info: {
            url: `../../../assets/img/10.jpg`,
            title: null,
            todos: [{
                txt: null,
                doneAt: null,
                isChecked: false
            }]
        }
    }, {
        id: utilService.makeId(),
        type: "img",
        doneAt: utilService.getDate(),
        isPinned: false,
        desc: null,
        info: {
            url: `../../../assets/img/2.jpg`,
            title: null,
            todos: [{
                txt: null,
                doneAt: null,
                isChecked: false
            }]
        }
    }, {
        id: utilService.makeId(),
        type: "img",
        doneAt: utilService.getDate(),
        isPinned: false,
        desc: "why am i still here?",
        info: {
            url: `../../../assets/img/12.jpg`,
            title: null,
            todos: [{
                txt: null,
                doneAt: null,
                isChecked: false
            }]
        }
    }]
}

function _generateNotes() {
    let newNote = {
        id: utilService.makeId(),
        type: getTypes(),
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