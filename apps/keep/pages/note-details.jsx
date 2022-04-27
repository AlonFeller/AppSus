import { carService as noteService } from "../services/car.service.js";
const { Link } = ReactRouterDOM
export class CarDetails extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        console.log(this.props);
        this.loadNote()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.noteId !== this.props.match.params.noteId) {
            this.loadNote()
        }
    }

    loadNote = () => {
        const { carId: noteId } = this.props.match.params
        noteService.getById(noteId)
            .then(note => {
                if (!note) return this.props.history.push('/')
                this.setState({ car: note })
            })
    }

    onGoBack = () => {
        this.props.history.push('/note')
    }

    onRemoveNote = () => {
        noteService.remove(this.state.note.id)
            .then(this.onGoBack)
    }

    render() {
        const { car: note } = this.state
        if (!note) return <div>Loading..</div>
        const nextNoteId = noteService.getNextNoteId(note.id)
        console.log('i was here');
        return <section className="note-details">
            Hello from note details
            {/* <h3>type : {note.type}</h3>
            {/* <div className="img-container">
                <img src={`assets/img/${note.vendor}.jpg`} />
            </div> */}
            {/* <p>{note.desc}</p>

            <button onClick={this.onGoBack}>Go Back!</button>
            <button onClick={this.onRemoveNote}>Delete</button>
            <Link to={`/note/${nextNoteId}`}><button>Next note</button></Link>
            <Link to={`/note/edit/${note.id}`}><button>Edit note</button></Link> */} 
        </section>
    }
}