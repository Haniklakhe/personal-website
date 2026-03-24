import Contact from '../components/Contact';
import './pages.css';

export default function ContactPage({ profile }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow">Contact</div>
          <h1>Let's Collaborate</h1>
          <p>
            Open to research partnerships, consulting opportunities, and academic
            collaborations in water and climate domains.
          </p>
        </div>
      </section>
      <Contact profile={profile} />
    </>
  );
}
