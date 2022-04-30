const { Link } = ReactRouterDOM

export function EmailDetails({ email, onCloseMail }) {
    if (!email) return null
    return <article className="email-preview" >

        <ul>
            <li>From : {email.from}</li>
            <li>To : {email.to}</li>
            <li>Subject : {email.subject}</li>
            <li>Sent at : {email.sentAt}</li>
        </ul>
        <div className="mail-container">
            <p> {email.body}</p>
        </div>
        <Link to="/email" onClick={() => onCloseMail()}>
            back
        </Link>
    </article>

}