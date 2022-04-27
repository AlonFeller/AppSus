import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    getById,
    query,
    remove

}

const KEY = 'emailsDB'


function query() {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _creatEmails()
        _saveToStorage(emails)
    }
    console.log(emails)
    return Promise.resolve(emails)
}


const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: false, // (optional property, if missing: show all)
    isStared: false, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}


function getById(emailId) {
    const emails = _loadFromStorage()
    const email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}

function remove(emailId) {
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    _saveToStorage(emails)
    return Promise.resolve()
}

function _add(emailToAdd) {
    let emails = _loadFromStorage()
    const email = _creatEmail()
    emails = [email, ...emails]
    _saveToStorage(emails)
    return Promise.resolve()
}

function _update(emailToUpdate) {
    let emails = _loadFromStorage()
    emails = emails.map(email => email.id === emailToUpdate.id ? emailToUpdate : email)
    _saveToStorage(emails)
    return Promise.resolve()
}

function _creatEmails() {
    const emails = []
    for (let i = 0; i < 5; i++) {
        emails.push(_creatEmail())
    }
    return emails
}

function _creatEmail() {
    const email = {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }
    return email
}

function _saveToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}


// const loggedinUser = {
//     email: 'user@appsus.com',
//     fullname: 'Mahatma Appsus'
// }