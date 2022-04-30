import { EmailPreview } from './email-preview.jsx'

export function EmailList({ emails,onOpenMail }) {
    return <section className="email-list">
        {emails.map((email, idx) => <EmailPreview idx={idx} onOpenMail={onOpenMail} email={email} key={email.id} />)}
    </section>
}