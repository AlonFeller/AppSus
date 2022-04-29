export function NotePreview({ note }) {
console.log(note);
    return <div className="note-card flex" key={note.id}>
        {note.type === 'txt' && <p>{note.desc}</p>}
        {note.type === 'img' && <img src={note.info.url} />}
        {note.type === 'todo' && <ul>
            {note.info.todos.map((todo, i) => {
                return <li key={i} className="flex">
                    <span
                        className="todo text"
                    >*{todo.txt}</span>
                    <span className="todo date">{todo.doneAt}</span>
                </li>
            })}
        </ul>}
        {note.type === 'video' && <div className="note-card flex" key={note.id}>
            <iframe width="330" height="215" src={note.info.url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            <div>{`type: ${note.type}`}</div>
        </div>
        }
        {note.type === 'audio' && <div className="note-card flex" key={note.id}>
            <div>{`type: ${note.type}`}</div>
        </div>}
        <span className={note.type}>{`type: ${note.type}`}</span>
        <span className={note.doneAt}>{note.doneAt}</span>
        <span className="btn delete">🗑️</span>
        <span className="btn pin">📌</span>
    </div>
}

    //btns
    {/* <span className="btn delete" onclick={onDeleteNote(note.id)}>🗑️</span>
        <span className="btn pin" onClick={onPinNote(note.id)}>📌</span> */}

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
