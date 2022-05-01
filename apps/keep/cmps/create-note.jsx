import { NoteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'


export class CreateNote extends React.Component {

    state = {
        note: {
            type: 'txt',
            desc: '',
            doneAt: '',
            isPinned: false
        },
        isOpen: false
    }

    removeEventBus

    componentDidMount() {
        this.removeEventBus = eventBusService.on('toggleNoteCompose', (isOpen) => {
            this.setState((prevState) => ({ ...prevState, isOpen }))
        })
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    handleChange = ({ target }) => {
        this.setState(prevState => ({ ...prevState, note: { ...prevState.note, desc: target.value } }))
    }

    onChangeType = (ev, type) => {
        ev.preventDefault()
        this.setState(prevState => ({ ...prevState, type }))
    }

    onToggleExtraFields = (isComposeOpen) => {
        eventBusService.emit('toggleScreen', isComposeOpen)
        this.setState(prevState => ({ ...prevState, isOpen: isComposeOpen }))
    }

    onCreateNote = (ev) => {
        ev.preventDefault();
        this.onToggleExtraFields(false);
       
        this.props.addNote(this.state.note)
        this.setState(prevState => ({
            ...prevState, note: ({
                desc: '',
                txt: '',
                url: '',
                todos: []
            })
        }))
    }


    render() {
        const { type, isOpen } = this.state
        return <form className="new-note" onSubmit={this.onCreateNote}>
            <div className="compose-preview flex column">
                <div className="compose-types flex">
                </div>
                <textarea
                    cols="35" rows="5" placeholder="Type here"
                    onChange={this.handleChange}
                    onFocus={() => this.onToggleExtraFields(true)}
                    value={this.state.note.desc}
                />
            </div>

            <div className='flex column extra-fields'>
                <button className="notes-primary-btn">Create</button>
            </div>
        </form >
    }

}