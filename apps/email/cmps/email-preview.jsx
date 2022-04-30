import { LongTxt } from '../cmps/email-long-text.jsx';

const { Link } = ReactRouterDOM


export function EmailPreview({ email, onOpenMail, idx, onRemoveMailtoTrash, onToggleIsRead, onToggleIsStarred }) {
    return <Link to={`/email/${email.id}`}>
        <article className="email-preview" onClick={() => onOpenMail(idx)}>
            <div className={`email-preview-msg ${(email.isRead) ? 'read' : ''}`}>
                <div className="btns flex">
                    <button className="fas fa-trash-alt fa-lg trash-btn flex justify-center align-center" onClick={(e) => onRemoveMailtoTrash(e, email.id)}></button>
                    <button className={`${(email.isStarred) ? 'fas' : 'far'} fa-star fa-lg clear-button starred-btn flex justify-center align-center`} onClick={(e) => onToggleIsStarred(e,email.id)}></button>
                    <button className={`fas fa-envelope${(email.isRead) ? '-open' : ''} fa-lg clear-button read-btn flex justify-center align-center`} onClick={(e) => onToggleIsRead(e,email.id)}></button>
                </div>
                <div className="flex justify-center align-center"> {email.to}</div>
                <div className="message-container">
                    <div className="mail-subject flex justify-center align-center"><LongTxt txt={email.subject} chars={25} /></div>
                    <div className="mail-message flex justify-center align-center"><LongTxt txt={email.body} chars={70} /></div>
                </div>
                <div className="flex justify-center align-center">{email.sentAt}</div>
            </div>
        </article>
    </Link>
}
