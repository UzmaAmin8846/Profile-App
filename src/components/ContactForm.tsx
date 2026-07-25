import { FormEvent, useState } from 'react';
import type { ContactInfo } from '../types';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  contact: ContactInfo;
}

const ICONS: Record<string, string> = {
  linkedin: '💼',
  behance: '🎨',
  github: '🐙',
  email: '✉️',
  phone: '📞',
  website: '🔗',
};

type FormState = 'idle' | 'submitted';

export default function ContactForm({ contact }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = 'Please enter your name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message) nextErrors.message = 'Please enter a message.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // No backend wired up — opens the user's mail client pre-filled.
    // Swap this for a fetch() call to your form endpoint / API route in production.
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setFormState('submitted');
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <p className="eyebrow">04 · Contact</p>
        <h2 id="contact-heading" className="section-title">
          Let's work together
        </h2>
        <p className="section-intro">
          Open to frontend development and UI/UX roles or freelance projects. Reach out directly
          or send a message below.
        </p>

        <div className={styles.grid}>
          <ul className={styles.linkList} aria-label="Contact links">
            {contact.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  className={styles.linkItem}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span aria-hidden="true">{ICONS[link.icon] ?? '🔗'}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className={styles.error} role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className={styles.error} role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className={styles.error} role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className={styles.submit}>
              Send message
            </button>

            <p role="status" className={styles.status}>
              {formState === 'submitted' &&
                "Opening your email client with the message ready to send…"}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
