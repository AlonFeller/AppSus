const { Link } = ReactRouterDOM


export function NotePreview( note ) {
    console.log(note);
    return <Link to={`/keep/note/${note.id}`}>
        <article className="Note-preview" >
            <h3>type : {note.type}</h3>
            <div className="img-container">
            </div>
        </article>
    </Link>
}