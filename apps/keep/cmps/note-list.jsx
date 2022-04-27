import { NotePreview } from '../cmps/note-preview.jsx'

export function noteBoard({ notes }) {
    return <section className="note-board flex">
        {notes.map(note => <NotePreview car={note} key={note.id} />)}
    </section>
}