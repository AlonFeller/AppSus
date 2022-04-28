import { NoteService } from "../services/note.service.js";
import {utilService} from "../../../services/util.service.js";
export class CreateNote extends React.Component {}

//     state = {
//         note: {
//             id: utilService.makeId(),
//             type:NoteService.,
//             info: {},
//             isPinned: false
//         }
//     }

//     ComponentDidMount() {
//         console.log('props from noteEdit', this.props);
//         this.loadNote()
//     }

//     loadNote = () => {
//         const { noteId } = this.prop.match.params
//         if (!noteId) return
//         NoteService.getById(noteId)
//         .then(note=>this.setState({note}))
//     }

//     handleChange = ({ target }) => {
//         const field = target.name
//         const value = target.type === 'number' ? +target.value : target.value
//         this.setState((prevState) => ({ note: { ...prevState.note, [field]: value } }))
//     }

//     onSaveNote = (ev) => {
//         ev.preventDefault()
//         carService.saveCar(this.state.note)
//             .then(() => {
//                 this.props.history.push('/note')
//             })
//     }

//     render() {
//         const { type, info } = this.state.note
//         return     <section className="note-edit">
//         <form className="flex column align-center" onSubmit={this.onSaveNote}>
//             <label htmlFor="type">type</label>
//             <input type="text" id="type" name="type" value={type} onChange={this.handleChange} />

//             <label htmlFor="info">Take a note...</label>
//             <input type="info" id="info" name="info" value={info} onChange={this.handleChange} />
//             <button>Save note!</button>
//         </form>
//     </section>
//     }
// }