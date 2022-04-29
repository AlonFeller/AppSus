export class ComposeEmail extends React.Component {

    state = {
        to: '',
        subject: '',
        body: ''
    }

    clearFields = () => {
        this.setState({ to: '', subject: '', body: '' })
    }

    handleChange = (ev) => {
        const prop = ev.target.name;
        const val = ev.target.value;
        this.setState({ [prop]: val })
    }

    onSendMail = (ev) => {
        const newEmail = {
            to: this.state.to,
            subject: this.state.subject,
            body: this.state.message
        }
        this.props.createNewEmail(newEmail).then(() => {
            this.clearFields();
            this.props.toggleIsCompose();
        })
        ev.preventDefault();
    }

    render() {
        return (
            <section className="email-compose-container">
                <header className="compose-header">
                    <div className="compose-title">New Message<button onClick={() => this.props.toggleIsCompose()}>X</button></div>
                    <div className="exit-btn"></div>
                </header>
                <form id="compose">
                    <label>To&nbsp;
                        <input type="email" name="to" value={this.state.to} placeholder="user@momo.com" required
                            onChange={this.handleChange}
                        /></label>
                </form>
                <label>Subject&nbsp;
                    <input type="text" name="subject" value={this.state.subject} placeholder="subject" required onChange={this.handleChange}
                    /></label>
                <textarea name="body" required rows="20" value={this.state.body} onChange={this.handleChange}></textarea>
                <button >Send</button>
            </section>
        )
    }
}