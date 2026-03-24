import About from '../components/About';
import './pages.css';

export default function AboutPage({ profile }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow">About Me</div>
          <h1>Driven By Water, Guided By Data, Grounded In Field Reality</h1>
          <p>
            I work at the intersection of hydrology, remote sensing, and citizen
            science to create practical and scalable solutions for water and climate challenges.
          </p>
        </div>
      </section>
      <About profile={profile} />
    </>
  );
}
