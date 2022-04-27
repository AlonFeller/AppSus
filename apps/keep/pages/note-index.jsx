import { noteService } from '../services/note.service.js'

import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'

const { Link } = ReactRouterDOM


export class KeepApp extends React.Component {
    state = {
        notes: [],
        filterBy: null
    }


    // componentDidMount() {
    //     this.loadNotes()
    // }

    // loadNotes = () => {
    //     noteService.query(this.state.filterBy)
    //         .then(notes => this.setState({ notes }))
    // }

    // onSetFilter = (filterBy) => {
    //     this.setState({ filterBy }, this.loadNotes)
    // }

    render() {
        const { notes } = this.state
        return <section className="keep-app">
            <h1>ther\'s nothing here go away</h1>
            {/* <Link to="/keep/note/edit"><button>Add note</button></Link>
            <NoteFilter onSetFilter={this.onSetFilter} history={this.props.history} />
            <NoteList notes={notes} onSelectNote={this.onSelectNote} /> */}
        </section>
    }
}