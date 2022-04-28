import { NoteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/note-preview.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { CreateNote } from '../cmps/create-note.jsx'
const { Link } = ReactRouterDOM


export class KeepApp extends React.Component {
    state = {
        notes: [],
        filterBy: null
    }


    componentDidMount() {
        console.log('Im on it hold your breath');
        this.loadNotes()
    }

    loadNotes = () => {
        console.log('just hold on');
        NoteService.query(this.state.filterBy)
            .then(notes => this.setState({ notes }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    render() {
        const { notes } = this.state
        console.log(notes);
        console.log('well ? you happy now?');
        return <section className="keep-app">
            <h1>there's nothing here go away</h1>
            {/* <CreateNote/> */}
            <section className="notes-container">
                {notes.map(note => <NotePreview note={note} key={note.id} />)}
            </section>
        </section >
    }
}