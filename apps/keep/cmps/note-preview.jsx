const { Link } = ReactRouterDOM


export function NotePreview({ car: note }) {
    return <Link to={`/car/${note.id}`}>
        <article className="Note-preview" >
            <h3>type : {note.vendor}</h3>
            <h3>Speed : {note.speed}</h3>
            <div className="img-container">
                <img src={`assets/img/${note.vendor}.jpg`} />
            </div>
        </article>
    </Link>
}