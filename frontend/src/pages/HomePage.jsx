import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './pages.css';

export default function HomePage({ profile, experience, projects, publications }) {
  const topExperience = (experience || []).slice(0, 3);
  const topProjects = (projects || []).slice(0, 3);
  const topPubs = (publications || []).slice(0, 3);

  return (
    <>
      <Hero profile={profile} />

      <section className="page-section">
        <div className="container page-grid three">
          <article className="preview-card">
            <div className="preview-eyebrow">Experience</div>
            <h3>Professional Journey</h3>
            <ul>
              {topExperience.map((item) => (
                <li key={item.id}>
                  <strong>{item.role}</strong>
                  <span>{item.organization}</span>
                </li>
              ))}
            </ul>
            <Link to="/experience" className="preview-link">View full timeline</Link>
          </article>

          <article className="preview-card">
            <div className="preview-eyebrow">Projects</div>
            <h3>Research Highlights</h3>
            <ul>
              {topProjects.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.category}</span>
                </li>
              ))}
            </ul>
            <Link to="/projects" className="preview-link">View all projects</Link>
          </article>

          <article className="preview-card">
            <div className="preview-eyebrow">Publications</div>
            <h3>Academic Output</h3>
            <ul>
              {topPubs.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.journal} ({item.year})</span>
                </li>
              ))}
            </ul>
            <Link to="/publications" className="preview-link">View publications</Link>
          </article>
        </div>
      </section>
    </>
  );
}
