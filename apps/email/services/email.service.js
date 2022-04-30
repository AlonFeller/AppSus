import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    getById,
    query,
    removeEmail,
    readingEmail,
    getUserMail,
    unreadCounter

}

const KEY = 'emailsDB'

const gEmails = [
    {
        id: utilService.makeId(),
        from:'momo@momo.com' , 
        to: 'user@appsus.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        from:'bobo@momo.com' , 
        to: 'user@appsus.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        from:'koko@momo.com' , 
        to: 'user@appsus.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        from:'muki@momo.com' , 
        to: 'user@appsus.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        from:'puki@momo.com' , 
        to: 'user@appsus.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        from:'user@appsus.com' , 
        to: 'puki@puki.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        from:'user@appsus.com' , 
        to: 'muki@muki.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        from:'user@appsus.com' , 
        to: 'shuki@shuki.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        from:'user@appsus.com' , 
        to: 'bubi@bubi.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    },
    {
        id: utilService.makeId(),
        from:'user@appsus.com' , 
        to: 'tester@tester.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    }
]

const gLoggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filterBy) {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _creatEmails()
        console.log(emails)
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


function getUserMail() {
    return gLoggedinUser.email
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: false, // (optional property, if missing: show all)
    isStared: false, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

function readingEmail(emailId) {
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

function removeEmail(emailId) {
    if (!email.isTrash) {
        email.isTrash = true
        updateMail(email)
        return Promise.resolve()
    } else {
        let emails = _loadFromStorage()
        emails = emails.filter(email => email.id !== emailId)
        _saveToStorage(emails)
        return Promise.resolve()
    }
}

function unreadCounter() {
    const emails = _loadFromStorage()
    let unReadCounter = 0
    emails.forEach(email => {
        if (!email.isTrashed && !email.isRead && email.to === gLoggedinUser.email) {
            unReadCounter++
        }
    })
    return Promise.resolve(unReadCounter)
}

function _addEmail(emailToAdd) {
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
    for (let i = 0; i < gEmails.length; i++) {
        emails.push(gEmails[i])
    }
    return emails
}

function _creatEmail() {
    const email = {
        id: utilService.makeId(),
        from:'user@appsus.com',
        to: 'momo@momo.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: false
    }
    return email
}

function _saveToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

