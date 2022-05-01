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
            .then(this.loadNotes)
            .catch(err => alert(err))
    }

    onPinNote = (noteId) => {
        NoteService.pin(noteId)
            .then(this.loadNotes)
            .catch(err => alert(err))
    }

    addNote = (note) => {
        NoteService.saveNote(note)
            .then(this.loadNotes)
            .catch(err => alert(err))
    }

    render() {
        const { notes } = this.state
        return <section className="keep-app">
            <CreateNote addNote={this.addNote} />
            <NoteFilter onSetFilter={this.onSetFilter} />
            {/* <CreateNote onAddNote={this.onAddNote} /> */}
            <section className="notes-container">
                {notes.map(note => <NotePreview note={note} onPinNote={this.onPinNote} onDeleteNote={this.onDeleteNote} key={note.id} />)}
            </section>
        </section >
    }
}