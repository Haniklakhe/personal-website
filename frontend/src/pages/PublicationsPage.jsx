import Publications from '../components/Publications';
import './pages.css';

export default function PublicationsPage({ publications }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow">Publications</div>
          <h1>Publications And Conferences</h1>
          <p>
            Peer-reviewed outputs and conference contributions in hydrology,
            geospatial science, and water resilience.
          </p>
        </div>
      </section>
      <Publications items={publications} />
    </>
  );
}
