import { LongTxt } from '../cmps/email-long-text.jsx';


export function EmailPreview({ email }) {
    return <article className="email-preview" >
        <div className="email-preview-msg" >
            <div className="btns flex">
                <button className="trash-btn flex justify-center align-center">delete</button>
                <button className="starred-btn flex justify-center align-center">star</button>
                <button className="read-btn flex justify-center align-center">read/unread</button>
            </div>
            <div className="flex justify-center align-center">To: {email.to}</div>
            <div className="message-container">
                <div className="mail-subject flex justify-center align-center"><LongTxt txt={email.subject} chars={25} /></div>
                <div className="mail-message flex justify-center align-center"><LongTxt txt={email.body} chars={70} /></div>
            </div>
            <div className="flex justify-center align-center">{email.sentAt}</div>
        </div>
    </article>

}