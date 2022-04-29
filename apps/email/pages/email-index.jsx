import { emailService } from '../services/email.service.js'
import { EmailList } from '../cmps/email-list.jsx'
import { EmailFilter } from '../cmps/email-filter.jsx'
import { EmailDetails } from '../pages/email-details.jsx'
import { EmailFolderList } from '../cmps/email-folder-list.jsx'
import { ComposeEmail } from '../cmps/email-compose.jsx'


export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        isCompose: false
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        const { filterBy } = this.state
        emailService.query(filterBy)
            .then(emails => this.setState({ emails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadEmails()
        })
    }

    onReadingEmail = (emailId) => {
        const { filterBy } = this.state
        emailService.readingEmail(emailId)
            .then(() => emailService.query(filterBy)
                .then(emails => this.setState({ emails })))
    }

    render() {
        return <section className="email-app">
            <EmailFilter onSetFilter={this.onSetFilter} />
            <EmailFolderList />
            <section className="mails-container">
                <EmailList emails={this.state.emails} />
            </section>
            {/* {isCompose && <ComposeEmail isCompose={isCompose}/> } */}
        </section>

    }
}