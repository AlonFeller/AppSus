import { storageService } from '../../../services/storage.service.js'


import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const KeepService = {
    getById,
    query,
    saveKeep,
    remove,
    getTypes,
    getNextCarId
}

const KEY = 'keepsDB'
var gTypes = ['txt', 'img', 'video', 'todo', 'audio', 'canvas', 'map']

function query(filterBy) {
    let keeps = _loadFromStorage()
    if (!keeps) {
        keeps = _createCars()
        _saveToStorage(keeps)
    }

    if (filterBy) {
        let { type, minSpeed, maxSpeed } = filterBy
        if (!minSpeed) minSpeed = 0;
        if (!maxSpeed) maxSpeed = Infinity
        keeps = keeps.filter(keep =>
            keep.type.includes(type) &&
            keep.speed <= maxSpeed &&
            keep.speed >= minSpeed)
    }

    return Promise.resolve(keeps)
}

function getNextCarId(keepId) {
    const keeps = _loadFromStorage()
    const keepIdx = keeps.findIndex(keep => keepId === keep.id)
    const nextCarIdx = (keepIdx + 1 === keeps.length) ? 0 : keepIdx + 1
    return keeps[nextCarIdx].id
}

function getById(keepId) {
    const keeps = _loadFromStorage()
    const keep = keeps.find(keep => keepId === keep.id)
    return Promise.resolve(keep)
}

function remove(keepId) {
    let keeps = _loadFromStorage()
    keeps = keeps.filter(kep => kep.id !== keepId)
    _saveToStorage(keeps)
    return Promise.resolve()
}

function saveKeep(keep) {
    if (keep.id) return _update(keep)
    else return _add(keep)
}

function _add(keepToAdd) {
    let keeps = _loadFromStorage()
    const keep = _createCar(keepToAdd.type, keepToAdd.speed)
    keeps = [keep, ...keeps]
    _saveToStorage(keeps)
    return Promise.resolve()
}

function _update(keepToUpdate) {
    let keeps = _loadFromStorage()
    keeps = keeps.map(keep => keep.id === keepToUpdate.id ? keepToUpdate : keep)
    _saveToStorage(keeps)
    return Promise.resolve()
}

function getTypes() {
    return gTypes
}

function _createKeep(type, speed = utilService.getRandomIntInclusive(1, 200)) {
    return {
        id: utilService.makeId(),
        type: type,
        speed,
        desc: utilService.makeLorem()
    }
}

function _createKeeps() {
    const keeps = []
    for (let i = 0; i < 20; i++) {
        const type = gTypes[utilService.getRandomIntInclusive(0, type.length - 1)]
        keeps.push(_createKeep(type))
    }
    return keeps
}

function _saveToStorage(keeps) {
    storageService.saveToStorage(KEY, keeps)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}


const notes = [{
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