import { LongTxt } from '../cmps/email-long-text.jsx';


export function EmailPreview({ email, onReadingEmail }) {
    console.log(email.message)
    return <article className="email-preview" >
        <div className="email-preview-msg" onClick={() => onReadingEmail(email.id)}>
            <div class="btns flex justify-cnter align-center">
                <button class="trash-btn">delete</button>
                <button class="starred-btn">star</button>
                <button class="read-btn">read/unread</button>
            </div>
            <div class="flex justify-cnter align-center">To: {email.to}</div>
            <div class="flex justify-cnter align-center message-container">
                <div className="mail-subject"><LongTxt txt={email.subject} chars={25} /></div>
                <div className="mail-message"><LongTxt txt={email.body} chars={70} /></div>
            </div>
            <div class="flex justify-cnter align-center">{email.sentAt}</div>
        </div>
    </article>

}