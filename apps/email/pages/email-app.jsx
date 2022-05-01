import { emailService } from '../services/email.service.js'
import { EmailList } from '../cmps/email-list.jsx'
import { EmailFilter } from '../cmps/email-filter.jsx'
import { EmailDetails } from './email-details.jsx'
import { EmailFolderList } from '../cmps/email-folder-list.jsx'
import { ComposeEmail } from '../cmps/email-compose.jsx'

const { Route, Switch } = ReactRouterDOM

export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        isCompose: true,
        isOpen: false,
        isRead: false,
        selectedStatus: 'inbox',
        selectedEmailIndex: null
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        const { filterBy, selectedStatus } = this.state
        emailService.query(filterBy, selectedStatus)
            .then(emails => {
                this.setState({
                    emails: emails
                })
            })
            emailService.unreadCounter()
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadEmails()
        })
    }

    onSetStatus = (selectedStatus) => {
        this.setState((prevState) => ({ ...prevState, selectedStatus }), () => {
            this.loadEmails()
        })
    }

    toggleIsCompose = () => {
        this.setState({ isCompose: !this.state.isCompose })
    }

    onOpenMail = (idx) => {
        const newState = this.state.emails.map((email, index) =>
            index === idx ? { ...email, isRead: true } : email
        )
        this.setState({ emails: newState, selectedEmailIndex: idx })
    }

    onRemoveMailtoTrash = (e, id) => {
        e.stopPropagation();
        emailService.RemoveMailtoTrash(id)
            .then(this.loadEmails)
    }

    onToggleIsRead = (e, id) => {
        e.stopPropagation();
        emailService.toggleIsRead(id)
            .then(this.loadEmails)
    }

    onToggleIsStarred = (e, id) => {
        e.stopPropagation();
        emailService.toggleIsStarred(id)
            .then(this.loadEmails)
    }

    onCloseMail = () => {
        this.setState({ selectedEmailIndex: null })
    }

    render() {
        const { isCompose, emails, selectedEmailIndex } = this.state

        return <section className="email-app">
            <EmailFilter onSetFilter={this.onSetFilter} />
            <EmailFolderList onSetStatus={this.onSetStatus} />
            <section className="mails-container">
                {!selectedEmailIndex && selectedEmailIndex !== 0 ?
                    <EmailList onOpenMail={this.onOpenMail} onRemoveMailtoTrash={this.onRemoveMailtoTrash}
                        onToggleIsRead={this.onToggleIsRead} onToggleIsStarred={this.onToggleIsStarred} emails={emails} /> : null}
                <Switch>
                    <Route path="/email/:id" render={() => <EmailDetails email={emails[selectedEmailIndex]} onCloseMail={this.onCloseMail} />} />
                </Switch>
            </section>
            {isCompose && <ComposeEmail isCompose={isCompose} />}
        </section>

    }
}



