import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './pages.css';

export default function HomePage({ profile, experience, projects, publications }) {
  const topExperience = (experience || []).slice(0, 6);
  const topProjects = (projects || []).slice(0, 3);
  const topPubs = (publications || []).slice(0, 3);

  const interests = [
    {
      title: 'Hydrology',
      text: 'Understanding watershed behavior and river processes for resilient water systems.'
    },
    {
      title: 'Citizen Science',
      text: 'Co-designing community-centered monitoring approaches to close data gaps.'
    },
    {
      title: 'Remote Sensing',
      text: 'Using satellite and geospatial data for flood, sediment, and climate-risk insights.'
    },
    {
      title: 'Science Communication',
      text: 'Converting technical outputs into decision-ready knowledge for real impact.'
    }
  ];

  const skillBars = [
    { label: 'Hydrological Modelling (SWAT / HEC-HMS)', value: 85 },
    { label: 'Remote Sensing and GIS', value: 88 },
    { label: 'Data Analysis (Python, R, GIS)', value: 82 },
    { label: 'Project Coordination and Leadership', value: 87 }
  ];

  const currentRoles = (experience || []).filter((item) => item.current).slice(0, 4);

  return (
    <>
      <Hero profile={profile} />

      <section className="page-section about-narrative">
        <div className="container">
          <div className="section-heading">
            <div className="page-eyebrow">About Me</div>
            <h2>I am a water engineering researcher focused on hydrology, geospatial science, and climate resilience.</h2>
          </div>
          <div className="narrative-grid">
            <p>
              I am currently pursuing an MSc in Water Engineering and Management at the Asian Institute of Technology (AIT),
              Thailand. My work combines hydrological modelling, remote sensing, GIS, and field science to support practical
              decision-making in flood risk and water security.
            </p>
            <p>
              Across Nepal and Southeast Asia, I have led and contributed to projects on suspended sediment dynamics,
              citizen-science hydro-meteorological monitoring, and sanitation mapping. I am passionate about building
              research that is technically strong, policy-relevant, and community-informed.
            </p>
          </div>
          <div className="section-action">
            <Link to="/about" className="preview-link">Read full profile</Link>
          </div>
        </div>
      </section>

      <section className="page-section alt-bg">
        <div className="container">
          <div className="section-heading">
            <div className="page-eyebrow">Research Interests</div>
            <h2>My Focus Areas</h2>
          </div>
          <div className="interest-grid">
            {interests.map((item) => (
              <article key={item.title} className="interest-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container page-grid two">
          <article className="preview-card">
            <div className="preview-eyebrow">Current Roles</div>
            <h3>What I Am Doing Now</h3>
            <ul>
              {currentRoles.map((item) => (
                <li key={item.id}>
                  <strong>{item.role}</strong>
                  <span>{item.organization}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="preview-card">
            <div className="preview-eyebrow">Skills</div>
            <h3>Core Strengths</h3>
            <div className="skill-bars">
              {skillBars.map((item) => (
                <div key={item.label} className="skill-row">
                  <div className="skill-meta">
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div className="skill-track">
                    <span style={{ width: `${item.value}%` }}></span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="page-section alt-bg">
        <div className="container">
          <div className="section-heading">
            <div className="page-eyebrow">Experience</div>
            <h2>Selected Timeline</h2>
          </div>
          <div className="timeline-list">
            {topExperience.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-period">{item.period}</div>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="section-action">
            <Link to="/experience" className="preview-link">View full experience</Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container page-grid two">
          <article className="preview-card">
            <div className="preview-eyebrow">Recent Projects</div>
            <h3>Field and Modelling Work</h3>
            <ul>
              {topProjects.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.category}</span>
                </li>
              ))}
            </ul>
            <Link to="/projects" className="preview-link">View more projects</Link>
          </article>

          <article className="preview-card">
            <div className="preview-eyebrow">Recent Publications</div>
            <h3>Academic Contributions</h3>
            <ul>
              {topPubs.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.journal} ({item.year})</span>
                </li>
              ))}
            </ul>
            <Link to="/publications" className="preview-link">View all publications</Link>
          </article>
        </div>
      </section>

      <section className="page-section cta-band">
        <div className="container cta-inner">
          <h2>Fostering Research For Sustainable Water Futures</h2>
          <p>
            Open to academic collaboration, applied research partnerships, and
            consulting in hydrology, GIS, and climate adaptation.
          </p>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </div>
      </section>
    </>
  );
}
