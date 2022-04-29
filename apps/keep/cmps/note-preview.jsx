import { NoteService } from '../services/note.service.js'
let pin=NoteService.pin

export function NotePreview({ note }) {
    if (note.type === 'txt') {
        return <div className="note-card flex" key={note.id}>
            <p>{note.desc}</p>
            <span className={note.type}>{`type: ${note.type}`}</span>
            <span className="btn delete">🗑️</span>
            <span className="btn pin">📌</span>
        </div>
    }
    if (note.type === 'img') {
        return <div className="note-card flex" key={note.id}>
            <img src={note.info.url} />
            <span>{`type: ${note.type}`}</span>
            <span className="btn delete">🗑️</span>
            <span className="btn pin">📌</span>
        </div>
    }
    if (note.type === 'todo') {
        return <div className="note-card flex left" key={note.id}>
            <ul>
                {note.info.todos.map((todo, i) => {
                    return <li key={i} className="flex">
                        <label
                            className={i}
                        >*{todo.txt}</label>
                    </li>
                })}            </ul>
            <span>{`type: ${note.type}`}</span>
            <span className="btn delete">🗑️</span>
            <span className="btn pin" onClick={pin(note.id)}>📌</span>

        </div>
    }

    //btns
    // <button onclick={onDeleteNote(note.id)}>🗑️</button>
    // <button onclick={onPinNote(note.id)}>📌</button>

    //more notes support
    // if (note.type === 'video') {
    //     return <div className="note-card flex" key={note.id}>
    //         <iframe width="330" height="215" src={note.info.url} 
    //         title="YouTube video player" 
    //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    //         allowFullScreen></iframe>
    //         <div>{`type: ${note.type}`}</div>
    //     </div>
    // }
    // if (note.type === 'audio') {
    //     return <div className="note-card flex" key={note.id}>
    //         <div>{`type: ${note.type}`}</div>
    //     </div>
    // }
    // if (note.type === 'canvas') {
    //     return <div className="note-card flex" key={note.id}>

    //         <div>{`type: ${note.type}`}</div>
    //     </div>
    // }
    // if (note.type === 'map') {
    //     return <div className="note-card flex" key={note.id}>
    //         <div>{`type: ${note.type}`}</div>
    //     </div>
    // }
}
