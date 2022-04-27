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



    // render() {
    //     return <section className="email-app">
    //         <div className="search-bar">
    //             {/* <input type="text" placeholder="Search"> */}
    //         </div>
    //         <nav className="label-side-bar">
    //             <button className="inbox-msgs"></button>
    //             <button className="sent-msgs"></button>
    //             <button className="trash-msgs"></button>
    //             <button className="draft-msgs"></button>
    //         </nav>
    //         <section className="mails-container">
    //         {/* <EmailList cars={this.carsToDisplay} onSelectCar={this.onSelectCar} /> */}
    //         </section>
    //     </section>

    // }

    render() {
        const { emails } = this.state
        return <section className="email-app">
            this is email app
            <EmailList emails = {emails}/>
        </section>
    }



}