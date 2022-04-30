import { EmailService } from '../services/email.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

export class EmailFolderList extends React.Component {

    state = {
        // unReadCounter: 0
    }


    render() {
        const { unReadCounter } = this.state
        return <section className="email-folder-list">
            <button className="mail-compose-btn " onClick={() => this.props.toggleIsCompose()} >+ Compose</button>
            <ul>
                <li className="mail-inbox-btn" onClick= {() => this.props.onSetStatus('inbox')} > Inbox  ({unReadCounter})</li>
                <li className="mail-sent-btn" onClick= {() => this.props.onSetStatus('sent')}> Sent</li>
                <li className="mail-starred-btn" onClick= {() => this.props.onSetStatus('starred')}>Starred</li>
                <li className="mail-trash-btn" onClick= {() => this.props.onSetStatus('trash')}>Trash</li>
                <li className="mail-drafts-btn" onClick= {() => this.props.onSetStatus('drafts')}>Drafts</li>
            </ul>

        </section>
    }
}








