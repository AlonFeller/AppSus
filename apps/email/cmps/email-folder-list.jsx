export class EmailFolderList extends React.Component {

    state = {
        status: 'inbox'
    }

    render() {
        return <section className="email-folder-list">

                <button className="inbox-msgs">inbox</button>
                <button className="sent-msgs">sent</button>
                <button className="trash-msgs">trash</button>
                <button className="draft-msgs">draft</button>

        </section>
    }
}