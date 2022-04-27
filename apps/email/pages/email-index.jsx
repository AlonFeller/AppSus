import { emailService } from '../services/email.service.js'

import { EmailList } from '../cmps/email-list.jsx'
import { EmailFilter } from '../cmps/email-filter.jsx'
import { EmailDetails } from '../pages/email-details.jsx'




const { link } = ReactRouterDOM


export class EmailApp extends React.Component {

    state = {
        emails: [],
        // filterBy: null
    }

    // componentDidMount() {
    //     this.loadEmails()
    // }

    // loadEmails = () => {
    //     EmailService.query(this.state)
    //         .then(emails => {
    //             this.setState({ emails })
    //             // eventBusService.emit('cars-count', cars.length)
    //         })
    // }

    componentDidMount() {
        emailService.query()
            .then(emails => this.setState({ emails }))
    }



    render() {
        const { emails } = this.state
        return <section className="email-app">
            <form className="search-bar">
                <label htmlFor="search">search</label>
                <input type="text" id="search" placeholder="Search" />
            </form>
            <nav className="label-side-bar">
                <button className="inbox-msgs">inbox</button>
                <button className="sent-msgs">sent</button>
                <button className="trash-msgs">trash</button>
                <button className="draft-msgs">draft</button>
            </nav>
            <section className="mails-container">
                {/* <EmailList cars={this.carsToDisplay} onSelectCar={this.onSelectCar} /> */}
                <EmailList emails={emails} />
            </section>
        </section>

    }
}