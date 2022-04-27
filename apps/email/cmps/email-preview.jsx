const { Link } = ReactRouterDOM

export function EmailPreview({ email }) {
    return <Link to={`/email/${email.id}`}>
        <div className="email-preview" >
            <div className="email-preview-msg">
                <h3>To: {email.to}</h3>
                <h3>{email.subject}</h3>
                <h3>{email.body}</h3>
                <h3>{email.sentAt}</h3>
            </div>
        </div>
    </Link>
}