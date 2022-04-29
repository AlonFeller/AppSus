import { NotePreview } from './cmps/note-preview.jsx'
import { NoteService } from '../services/note.service.js'



export class CreateNote extends React.Component {

    state = {
        note: {
            type: 'txt',
            title: '',
            txt: '',
            url: '',
            todos: [{
                txt: null,
                doneAt: null,
                isChecked: false
            }],
            isPinned: false
        }
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

    handleFieldChange = ({ target }) => {
        this.setState(prevState => ({ ...prevState, fields: { ...prevState.fields, [target.name]: target.value } }))
    }

    onChangeType = (ev, type) => {
        ev.preventDefault()
        this.setState(prevState => ({ ...prevState, type }))
    }

    onToggleExtraFields = (isComposeOpen) => {
        eventBusService.emit('toggleScreen', isComposeOpen)
        this.setState(prevState => ({ ...prevState, isOpen: isComposeOpen }))
    }


    render() {
        <section className="note-card new">
            <input type="text"
                name="title"
                placeholder="Title"
                onChange={this.handleFieldChange}
                onFocus={() => this.onToggleExtraFields(true)}
                className={` ${(isOpen && type !== 'todos') ? 'compose-open' : ''}`}
                value={this.state.fields.title} />
        
        </section >

    }

}