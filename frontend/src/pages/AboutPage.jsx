import About from '../components/About';
import './pages.css';

export default function AboutPage({ profile }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-eyebrow">About Me</div>
          <h1>Driven By Water, Guided By Data</h1>
          <p>
            A multidisciplinary researcher focused on hydrology, climate risk, and
            resilient water systems across South and Southeast Asia.
          </p>
        </div>
      </section>
      <About profile={profile} />
    </>
  );
}
