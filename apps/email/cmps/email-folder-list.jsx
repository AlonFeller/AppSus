export class EmailFolderList extends React.Component {

    state = {
        selectedStatus: 'inbox'
        // inbox / sent / trash/ draft/ starred
    }

    onSelectStatus = (selectedStatus) => {
        this.setState((prevState) => ({ ...prevState, selectedStatus }))
    }

    render() {
        return <section className="email-folder-list">
            <ul>
                <li className="mail-inbox-btn">Inbox</li>
                <li className="mail-sent-btn">Sent</li>
                <li className="mail-starred-btn">Starred</li>
                <li className="mail-trash-btn">Trash</li>
                <li className="mail-drafts-btn">Drafts</li>
            </ul>

        </section>
    }
}










// ({this.props.unReadCounter})