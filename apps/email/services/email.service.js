import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const emailService = {
    getById,
    query,
    // removeEmail,
    getUserMail,
    toggleIsRead,
    RemoveMailtoTrash,
    toggleIsStarred,
    displayEmails,
    unreadCounter,
    addEmail

}

const KEY = 'emailsDB'

const gEmails = [
    {
        id: utilService.makeId(),
        from: 'momo@momo.com',
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
        from: 'bobo@momo.com',
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
        from: 'koko@momo.com',
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
        from: 'muki@momo.com',
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
        from: 'puki@momo.com',
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
        from: 'user@appsus.com',
        to: 'puki@puki.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: true
    },
    {
        id: utilService.makeId(),
        from: 'user@appsus.com',
        to: 'muki@muki.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: true
    },
    {
        id: utilService.makeId(),
        from: 'user@appsus.com',
        to: 'shuki@shuki.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: true
    },
    {
        id: utilService.makeId(),
        from: 'user@appsus.com',
        to: 'bubi@bubi.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: true
    },
    {
        id: utilService.makeId(),
        from: 'user@appsus.com',
        to: 'tester@tester.com',
        subject: utilService.makeId(),
        body: utilService.makeLorem(),
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
        isSent: true
    }
]

const gLoggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filterBy, selectedStatus) {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _creatEmails()
        _saveToStorage(emails)
    }
    let displayedEmails = displayEmails(selectedStatus, emails)
    if (filterBy) {
        let { search, isRead } = filterBy
        displayedEmails = displayedEmails.filter(email => {
            console.log(email.isRead, isRead)
            return email.body.toLowerCase().includes(search.toLowerCase()) ||
                email.subject.toLowerCase().includes(search.toLowerCase()) ||
                email.to.toLowerCase().includes(search.toLowerCase())
            &&
            email.isRead === isRead
        }
        )
    }

    return Promise.resolve(displayedEmails)
}

function displayEmails(selectedStatus, emails) {
    const UserMail = getUserMail()
    switch (selectedStatus) {
        case 'inbox':
            return emails.filter(email => (email.to.toLowerCase() === UserMail && !email.isTrash));
        case 'starred':
            return emails.filter(email => (email.isStarred && !email.isTrash));
        case 'sent':
            return emails.filter(email => (email.to.toLowerCase() !== UserMail && !email.isTrash && !email.isDraft));
        case 'trash':
            return emails.filter(email => (email.isTrash));
        case 'draft':
            return emails.filter(email => (email.isDraft && !email.isTrash));
    }
}

function getUserMail() {
    return gLoggedinUser.email
}

// function readingEmail(emailId) {
//     return getById(emailId).then(email => {
//         email.isRead = true
//         _update(email)
//         return Promise.resolve(email)
//     })
// }

function getById(emailId) {
    const emails = _loadFromStorage()
    const email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}

// function removeEmail(emailId) {
//     if (!email.isTrash) {
//         email.isTrash = true
//         updateMail(email)
//         return Promise.resolve()
//     } else {
//         let emails = _loadFromStorage()
//         emails = emails.filter(email => email.id !== emailId)
//         _saveToStorage(emails)
//         return Promise.resolve()
//     }
// }

function unreadCounter() {
    const emails = _loadFromStorage() || _creatEmails()
    const UserMail = getUserMail()
    let unReadCounter = 0
    emails.forEach(email => {
        if (!email.isTrashed && !email.isRead && email.to === UserMail) {
            unReadCounter++
        }
    })
    return Promise.resolve(unReadCounter)
}

function addEmail(newEmail) {
    let emails = _loadFromStorage()
    const email = _creatNewEmail(newEmail)
    emails = [email, ...emails]
    _saveToStorage(emails)
    return Promise.resolve()
}


// function _update(emailToUpdate) {
//     let emails = _loadFromStorage()
//     emails = emails.map(email => email.id === emailToUpdate.id ? emailToUpdate : email)
//     _saveToStorage(emails)
//     return Promise.resolve()
// }


function _creatNewEmail(newEmail) {
    let { to, subject, body } = newEmail
   const newEmailCreat = {
        id: utilService.makeId(),
        from: 'user@appsus.com',
        to,
        subject,
        body,
        sentAt: utilService.getDate(),
        isRead: false,
        isStarred: false,
        isTrash: false,
        isDraft: false,
    }
    return newEmailCreat
}

function toggleIsRead(id) {
    let emails = _loadFromStorage()
    let email = emails.find(email => email.id === id)
    email.isRead = !email.isRead
    _saveToStorage(emails)
    return Promise.resolve(email)
}

function RemoveMailtoTrash(id) {
    let emails = _loadFromStorage()
    let email = emails.find(email => email.id === id)
    email.isTrash = true
    _saveToStorage(emails)
    return Promise.resolve(email)
}

function toggleIsStarred(id) {
    let emails = _loadFromStorage()
    let email = emails.find(email => email.id === id)
    email.isStarred = !email.isStarred
    _saveToStorage(emails)
    return Promise.resolve(email)
}

function _creatEmails() {
    const emails = []
    for (let i = 0; i < gEmails.length; i++) {
        emails.push(gEmails[i])
    }
    return emails
}

function _saveToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}