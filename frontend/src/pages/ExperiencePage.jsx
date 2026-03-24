import Experience from '../components/Experience';
import './pages.css';

export default function ExperiencePage({ experience }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow">Experience</div>
          <h1>Professional Timeline</h1>
          <p>
            Five years of progressive research and implementation experience in
            hydrology, GIS, and climate adaptation.
          </p>
        </div>
      </section>
      <Experience items={experience} />
    </>
  );
}
