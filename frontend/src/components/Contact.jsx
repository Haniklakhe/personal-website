import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  In production, send to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Get in Touch</h2>
          <p className={styles.subtitle}>Feel free to reach out for collaborations or inquiries</p>
        </div>

        <div className={styles.content}>
          <div className={styles.form}>
            {submitted && (
              <div className={styles.success}>
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submit}>Send Message</button>
            </form>
          </div>

          <div className={styles.info}>
            <h3>Direct Contact</h3>
            <p>
              <strong>Email:</strong><br />
              <a href={`mailto:${profile?.email}`}>{profile?.email}</a>
            </p>
            <p>
              <strong>Phone:</strong><br />
              {profile?.phone}
            </p>
            <p>
              <strong>Location:</strong><br />
              {profile?.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
