import Projects from '../components/Projects';
import './pages.css';

export default function ProjectsPage({ projects }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow">Projects</div>
          <h1>Research And Field Projects</h1>
          <p>
            Project portfolio spanning sediment monitoring, flood risk modelling,
            sanitation mapping, and climate analytics.
          </p>
        </div>
      </section>
      <Projects items={projects} />
    </>
  );
}
