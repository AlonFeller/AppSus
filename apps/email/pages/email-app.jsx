import { emailService } from '../services/email.service.js'
import { EmailList } from '../cmps/email-list.jsx'
import { EmailFilter } from '../cmps/email-filter.jsx'
import { EmailDetails } from './email-details.jsx'
import { EmailFolderList } from '../cmps/email-folder-list.jsx'
import { ComposeEmail } from '../cmps/email-compose.jsx'

const { Route, Switch } = ReactRouterDOM

export class EmailApp extends React.Component {

    state = {
        displayedEmails: [],
        emails: [],
        filterBy: null,
        isCompose: true,
        isOpen: false,
        unReadCounter: 0,
        selectedStatus: 'inbox',
        selectedEmailIndex: null
    }

    componentDidMount() {
        this.loadEmails()
    }

    emailsCounter = () => {
        return this.state.unReadCounter;
    }

    getUnreadEmails = (emails) => {

    }

    loadEmails = () => {
        const { filterBy } = this.state
        emailService.query(filterBy)
            .then(emails => {
                let filteredEmailsByStatus = this.displayEmails(emails);
                this.setState({
                    emails: emails,
                    displayedEmails: filteredEmailsByStatus
                })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadEmails()
        })
    }

    onSetStatus = (selectedStatus) => {
        this.setState({ selectedStatus }, () => {
            const filteredEmails = this.displayEmails(this.state.emails)
            this.setState({displayedEmails: filteredEmails})
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
        this.setState({ emails: newState, selectedEmailIndex: idx })
    }

    onRemoveMailtoTrash = (e,id) => {
        e.stopPropagation();
        const newState = this.state.emails.map(email =>
            email.id === id ? { ...email, isTrash: true } : email
        )
        this.setState({ emails: newState }, function() {
            const filteredState = this.displayEmails(this.state.emails);
            this.setState({displayedEmails: filteredState})
        });
    }

    onToggleIsRead = (e,id) => {
        e.stopPropagation();
        const newDisplayState = this.state.displayedEmails.map(email =>
            email.id === id ? { ...email, isRead: !email.isRead } : email
        )

        const newEmailState = this.state.emails.map(email => 
            email.id === id ? { ...email, isRead: !email.isRead } : email
        )

        this.setState({ emails: newEmailState, displayedEmails: newDisplayState })
    }

    onToggleIsStarred = (e,id) => {
        e.stopPropagation();
        const newDisplayState = this.state.displayedEmails.map(email =>
            email.id === id ? { ...email, isStarred: !email.isStarred } : email
        )

        const newEmailState = this.state.emails.map(email => 
            email.id === id ? { ...email, isStarred: !email.isStarred } : email
        )

        this.setState({ emails: newEmailState, displayedEmails: newDisplayState })
    }

    onCloseMail = () => {
        this.setState({ selectedEmailIndex: null })
    }

    displayEmails = (emails) => {
        // console.log(emails)
        // return emails
        if (!emails) return []
        let { selectedStatus } = this.state;
        const UserMail = emailService.getUserMail();

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

    render() {
        const { isCompose, emails,displayedEmails, selectedEmailIndex } = this.state
        // console.log(message)

        return <section className="email-app">
            <EmailFilter onSetFilter={this.onSetFilter} />
            <EmailFolderList onSetStatus={this.onSetStatus} />
            <section className="mails-container">
                {!selectedEmailIndex && selectedEmailIndex !== 0 ?
                    <EmailList onOpenMail={this.onOpenMail} onRemoveMailtoTrash={this.onRemoveMailtoTrash}
                        onToggleIsRead={this.onToggleIsRead} onToggleIsStarred={this.onToggleIsStarred} emails={displayedEmails} /> : null}
                <Switch>
                    <Route path="/email/:id" render={() => <EmailDetails email={emails[selectedEmailIndex]} onCloseMail={this.onCloseMail} />} />
                </Switch>
            </section>
            {isCompose && <ComposeEmail isCompose={isCompose} />}
        </section>

    }
}



