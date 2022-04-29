export class ComposeEmail extends React.Component {

    state = {
        to: '',
        subject: '',
        body: ''
    }

    clearFields = () => {
        this.setState({ to: '', subject: '', messbodyage: '' })
    }

    render() {
        return (
            <section className="email-compose-container">
                <header className="compose-header">
                    <div className="compose-title">New Message</div>
                    <div className="exit-btn"></div>
                </header>
                <form id="compose">
                    <label>To&nbsp;
                        <input type="email" name="to" value={this.state.draft.address} placeholder="user@momo.com" required
                            onChange={this.handleChange} ref={this.toInputRef}
                        /></label>
                </form>
                <label>Subject&nbsp;
                    <input type="text" name="subject" placeholder="subject" required onChange={this.handleChange}
                    /></label>
                <textarea name="body" required rows="20" value={this.state.message} onChange={this.handleChange}></textarea>
                <button >Send</button>
            </section>
        )
    }
}