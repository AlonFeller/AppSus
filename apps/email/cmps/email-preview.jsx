
export function EmailPreview({ email, onReadingEmail }) {

    return <article className="email-preview" >
        <div className="email-preview-msg" onClick={() => onReadingEmail(email.id)}>
            <h3>To: {email.to}</h3>
            <h3>{email.subject}</h3>
            <h3>{email.body}</h3>
            <h3>{email.sentAt}</h3>
        </div>
    </article>

}