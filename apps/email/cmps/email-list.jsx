import { EmailPreview } from './email-preview.jsx'

export function EmailList({ cars }) {
    return <section className="email-list">
        {emails.map(email => <EmailPreview email={email} key={email.id} />)}
    </section>
}