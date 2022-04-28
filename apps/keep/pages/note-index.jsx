import { NoteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/note-preview.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import {NoteEdit} from '../cmps/take-note.jsx'
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
            {/* <NoteEdit/> */}
            <section className="notes-container">
                {notes.map(note => {
                    return <div className="note-card flex" key={note.id}
                    // onClick = { NotePreview(note) } 
                    >
                        <div>{`type: ${note.type}`}</div>
                        <p>{note.info.desc}</p>
                    </div>
                })}
            </section>
        </section >
    }
}