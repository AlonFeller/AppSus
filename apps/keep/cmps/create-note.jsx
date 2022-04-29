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



    render() {
        <section className="note-card new">


        </section>

    }

}