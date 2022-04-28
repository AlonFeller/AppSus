import { LongTxt } from '../cmps/email-long-text.jsx';


export function EmailPreview({ email, onReadingEmail }) {
    console.log(email.message)
    return <article className="email-preview" >
        <div className="email-preview-msg" onClick={() => onReadingEmail(email.id)}>
            <div class="btns">
                <button class="trash-btn flex justify-cnter align-center">delete</button>
                <button class="starred-btn flex justify-cnter align-center">star</button>
                <button class="read-btn flex justify-cnter align-center">read/unread</button>
            </div>
            <div class="flex justify-cnter align-center">To: {email.to}</div>
            <div class="message-container">
                <div className="mail-subject flex justify-cnter align-center"><LongTxt txt={email.subject} chars={25} /></div>
                <div className="mail-message flex justify-cnter align-center"><LongTxt txt={email.body} chars={70} /></div>
            </div>
            <div class="flex justify-cnter align-center">{email.sentAt}</div>
        </div>
    </article>

}