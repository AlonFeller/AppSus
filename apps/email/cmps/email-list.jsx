import { EmailPreview } from './email-preview.jsx'

export function EmailList({ emails, onOpenMail, onRemoveMailtoTrash, onToggleIsRead, onToggleIsStarred }) {
    return <section className="email-list">
        {emails.map((email, idx) =>
            <EmailPreview idx={idx} onOpenMail={onOpenMail} onRemoveMailtoTrash={onRemoveMailtoTrash}
                onToggleIsRead={onToggleIsRead} onToggleIsStarred={onToggleIsStarred}
                email={email} key={email.id} />)}
    </section>
}