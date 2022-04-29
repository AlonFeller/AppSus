import { NoteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'


export class CreateNote extends React.Component {

    state = {
        note: {
            type: 'txt',
            desc: '',
            txt: '',
            url: '',
            todos: [{
                txt: null,
                doneAt: null,
                isChecked: false
            }],
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
        this.setState(prevState => ({ ...prevState, note: { ...prevState.note, [target.name]: target.value } }))
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
        NoteService.saveNote(this.state)
            .then(() => {
                console.log('hi');
                this.setState(prevState => ({
                    ...prevState, note: ({
                        desc: '',
                        txt: '',
                        url: '',
                        todos: []
                    })
                }))
            })
            .catch(err => alert(err))
    }


    render() {
        const { type, isOpen } = this.state
        return <form className="new-note" onSubmit={(ev) => { this.onCreateNote(ev) }}>
            <div className="compose-preview flex column">
                <div className="compose-types flex">
                </div>
                <textarea name="desc" cols="35" rows="5" placeholder="Type here"
                    onChange={this.handleChange}
                    onFocus={() => this.onToggleExtraFields(true)}
                    >
                        {/* value={this.state.fields.title} */}
                </textarea>
            </div>

            <div className='flex column extra-fields'>
                <button className="notes-primary-btn">Create</button>
            </div>
        </form >
    }

}