import { storageService } from '../../../services/storage.service.js'


export const emailService = {
    getById,
    query,
    remove,

}

const KEY = 'emailsDB'


function query(filterBy) {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _creatEmails()
        _saveToStorage(emails)
    }

    // if (filterBy) {
    //     let { vendor, minSpeed, maxSpeed } = filterBy
    //     if (!minSpeed) minSpeed = 0;
    //     if (!maxSpeed) maxSpeed = Infinity
    //     cars = cars.filter(car =>
    //         car.vendor.includes(vendor) &&
    //         car.speed <= maxSpeed &&
    //         car.speed >= minSpeed)
    // }

    return Promise.resolve(emails)
}
 const criteria = {
     status: 'inbox/sent/trash/draft',
     txt: 'puki', // no need to support complex text search
     isRead: false, // (optional property, if missing: show all)
     isStared: false, // (optional property, if missing: show all)
     lables: ['important', 'romantic'] // has any of the labels
 }


function remove(emailId) {
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    _saveToStorage(emails)
    return Promise.resolve()
}

function getById(emailId) {
    const emails = _loadFromStorage()
    const email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}

function _creatEmails(){
    const emails = []
    emails.push(_creatEmail())
}

function _creatEmail() {
    const email = {
        id: 'e101',
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