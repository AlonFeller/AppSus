import { emailService } from '../services/email.service.js'
import { EmailList } from '../cmps/email-list.jsx'
import { EmailFilter } from '../cmps/email-filter.jsx'
import { EmailDetails } from './email-details.jsx'
import { EmailFolderList } from '../cmps/email-folder-list.jsx'
import { ComposeEmail } from '../cmps/email-compose.jsx'

// const { Route, Switch } = ReactRouterDOM

export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        isCompose: true,
        isOpen: false,
        selectedStatus: 'inbox'
        // inbox / sent / trash/ draft/ starred
    }

    componentDidMount() {
        this.loadEmails()
    }

    emailsCounter = () => {
        return this.state.unReadCounter;
    }

    loadEmails = () => {
        const { filterBy } = this.state
        emailService.query(filterBy)
            .then(emails => {
                let filteredEmailsByStatus = this.displayEmails(emails)
                this.setState({
                    emails: filteredEmailsByStatus
                })
            })
        // .then(emails => this.displayEmails({ emails }))
        // .then(emails => this.setState({ emails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadEmails()
        })
    }

    onSetStatus = (selectedStatus) => {
        this.setState({ selectedStatus }, () => {
            this.loadEmails()
        })
    }

    onSelectStatus = (selectedStatus) => {
        this.setState((prevState) => ({ ...prevState, selectedStatus }))
    }

    toggleIsCompose = () => {
        this.setState({ isCompose: !this.state.isCompose })
    }

    onOpenMail = (idx) => {
        const newState = this.state.emails.map((email, index) =>
            index === idx ? { ...email, isRead: true } : email
        )
        this.setState({ emails: newState })
        console.log(newState)
    }

    // onReadingEmail = (emailId) => {
    //     const { filterBy } = this.state
    //     emailService.readingEmail(emailId)
    //         .then(() => emailService.query(filterBy)
    //             .then(emails => this.setState({ emails })))
    // }

    displayEmails = (emails) => {
        if (!emails) return []
        let { selectedStatus } = this.state
        // if (!selectedStatus) selectedStatus = 'inbox'
        const UserMail = emailService.getUserMail()
        switch (selectedStatus) {
            case 'inbox':
                emails = emails.filter(email => (email.to.toLowerCase() === UserMail && !email.isTrash));
                break;
            case 'starred':
                emails = emails.filter(email => (email.isStarred && !email.isTrash));
                break;
            case 'sent':
                emails = emails.filter(email => (email.to.toLowerCase() !== UserMail && !email.isTrash && !email.isDraft));
                break;
            case 'trash':
                emails = emails.filter(email => (email.isTrash));
                break;
            case 'draft':
                emails = emails.filter(email => (email.isDraft && !email.isTrash));
                break;
        }
        return emails
    }


    render() {
        const { isCompose } = this.state
        return <section className="email-app">
            <EmailFilter onSetFilter={this.onSetFilter} />
            <EmailFolderList onSetStatus={this.onSetStatus} />
            <section className="mails-container">
                <EmailList onOpenMail={this.onOpenMail} emails={this.state.emails} />
            </section>
            {isCompose && <ComposeEmail isCompose={isCompose} />}
        </section>

    }
}



