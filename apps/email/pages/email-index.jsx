const { link } = ReactRouterDOM


export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null
    }

    render() {
        console.log('this is email app');
        return <section className="email-app-container">
            <div className="search-bar">
                {/* <input type="text" placeholder="Search"> */}
            </div>
            <nav className="label-side-bar">
                <button className="inbox-msgs"></button>
                <button className="sent-msgs"></button>
                <button className="trash-msgs"></button>
                <button className="draft-msgs"></button>
            </nav>
            <section className="mails-container">

            </section>
        </section>

    }




}