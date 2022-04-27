const { Link } = ReactRouterDOM

export function EmailPreview({ email }) {
    return <Link to={`/email/${email.id}`}>
        <article className="email-preview" >
            <h3>From : {email.vendor}</h3>
            <h3>To : {email.to}</h3>
            <h3>Subject : {email.subject}</h3>
            <h3>Sent at : {email.sentAt}</h3>
            <div className="mail-container">
                <p>{email.body}</p>
            </div>
        </article>
    </Link>
}