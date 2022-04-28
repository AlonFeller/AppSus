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
                <li className="mail-inbox-btn" ><a> Inbox </a></li>
                <li className="mail-sent-btn" ><a >Sent</a></li>
                <li><a className="mail-starred-btn">Starred</a></li>
                <li><a className="mail-trash-btn">Trash</a></li>
                <li><a className="mail-drafts-btn">Drafts</a></li>
            </ul>

        </section>
    }
}










// ({this.props.unReadCounter})