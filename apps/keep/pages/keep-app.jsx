import { NoteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/note-preview.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { CreateNote } from '../cmps/create-note.jsx'
const { Link } = ReactRouterDOM


export class KeepApp extends React.Component {
    state = {
        notes: [],
        filterBy: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        const { filterBy } = this.state
        NoteService.query(filterBy)
            .then(notes => this.setState({ notes }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    onDeleteNote = (noteId) => {
        NoteService.remove(noteId)
        this.props.loadNotes()
    }

    onPinNote =(noteId) => {
        NoteService.pin(noteId)
    }

    render() {
        const { notes } = this.state
        return <section className="keep-app">
            <CreateNote/>
            <NoteFilter onSetFilter={this.onSetFilter} />
            {/* <CreateNote onAddNote={this.onAddNote} /> */}
            <section className="notes-container">
                {notes.map(note => <NotePreview note={note} key={note.id} />)}
            </section>
        </section >
    }
}