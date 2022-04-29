export function NotePreview({ note }) {
        return <div className="note-card flex" key={note.id}>
        {note.type === 'txt' && <p>{note.desc}</p>}
        {note.type === 'img' && <div className="img-container"><img src={note.info.url} /></div>}
        {note.type === 'todo' && <ul>
            {note.info.todos.map((todo, i) => {
                return <li key={i} className="flex">
                    <span
                        className="todo text"
                    >-{todo.txt}</span>
                    <span className="todo date">{todo.doneAt}</span>
                </li>
            })}
        </ul>}
        {note.type === 'video' && <div className="note-card flex" key={note.id}>
            <iframe width="330" height="215" src={note.info.url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        </div>
        }
        {note.type === 'audio' && <div className="note-card flex" key={note.id}>
        </div>}
        <span className="btn delete">🗑️</span>
        <span className="btn pin">📌</span>
        <span className={note.doneAt}>{note.doneAt}</span>
    </div>
}

//btns
{/* <span className="btn delete" onclick={onDeleteNote(note.id)}>🗑️</span>
        <span className="btn pin" onClick={onPinNote(note.id)}>📌</span> */}
