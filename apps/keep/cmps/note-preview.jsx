const { Link } = ReactRouterDOM


export function NotePreview({ note }) {
    // console.log(note);
    let idx = 0;
    if (note.type === 'txt') {
        return <div className="note-card flex" key={note.id}>
            <p>{note.desc}</p>
            <div className={note.type}>{`type: ${note.type}`}</div>
        </div>
    }
    if (note.type === 'img') {
        return <div className="note-card flex" key={note.id}>
            <img src={note.info.url} />
            <div>{`type: ${note.type}`}</div>
        </div>
    }
    if (note.type === 'video') {
        return <div className="note-card flex" key={note.id}>
            <iframe width="260" height="215" src={note.info.url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <div>{`type: ${note.type}`}</div>
        </div>
    }
    if (note.type === 'todo') {
        return <div className="note-card flex" key={note.id}>
            <ul>
                {note.info.todo.map((todo, i) => {
                    return <li key={i} className="flex">
                        <label
                            className={i}
                        >*{todo.txt}</label>
                    </li>
                })}
            </ul>
            <div>{`type: ${note.type}`}</div>
        </div>
    }
    if (note.type === 'audio') {
        return <div className="note-card flex" key={note.id}>
            <div>{`type: ${note.type}`}</div>
        </div>
    }
    if (note.type === 'canvas') {
        return <div className="note-card flex" key={note.id}>

            <div>{`type: ${note.type}`}</div>
        </div>
    }
    if (note.type === 'map') {
        return <div className="note-card flex" key={note.id}>
            <div>{`type: ${note.type}`}</div>
        </div>
    }

}
