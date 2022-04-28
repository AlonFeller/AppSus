import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    getById,
    query,
    remove,
    readingEmail

}

const KEY = 'emailsDB'


function query(filterBy) {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _creatEmails()
        _saveToStorage(emails)
    }

    if (filterBy) {
        let { search, isRead } = filterBy
        emails = emails.filter(email => {
            return email.body.toLowerCase().includes(search.toLowerCase()) ||
                email.subject.toLowerCase().includes(search.toLowerCase()) ||
                email.to.toLowerCase().includes(search.toLowerCase())
                 &&
            email.isRead === isRead
        }
        )
    }
    return Promise.resolve(emails)
}


const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: false, // (optional property, if missing: show all)
    isStared: false, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

function readingEmail(emailId){
    return getById(emailId).then(email => {
        email.isRead = true
        _update(email)
        return Promise.resolve(email)
    })
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
        emails.push(_creatEmail(i))
    }
    return emails
}

function _creatEmail() {
    const email = {
        id: utilService.makeId(),
        subject: utilService.makeId(),
        // body: 'Would love to catch up sometimes',
        body: utilService.makeLorem(),
        isRead: false,
        sentAt: new Date().toLocaleDateString(),
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