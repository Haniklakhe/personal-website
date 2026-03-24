import styles from './Hero.module.css';
import { Link } from 'react-router-dom';

export default function Hero({ profile }) {
  if (!profile) return <div>Loading...</div>;

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.introTag}>HELLO, MY NAME IS</div>
          <div className={styles.eyebrow}>{profile.title}</div>
          <h1 className={styles.name}>
            {profile.firstName}
            <em>{profile.lastName}</em>
          </h1>
          <p className={styles.subtitle}>{profile.subtitle}</p>
          <p className={styles.quote}>"{profile.shortBio}"</p>
          
          <div className={styles.pills}>
            {profile.status?.map((s, i) => (
              <div key={i} className={styles.pill}>
                <span className={styles.dot}></span>
                {s.label}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <Link to="/about" className="btn btn-primary">About Me</Link>
            <Link to="/projects" className="btn btn-secondary">View Projects</Link>
            <Link to="/contact" className="btn btn-outline">Contact</Link>
          </div>

          <div className={styles.stats}>
            {profile.stats?.map((stat, i) => (
              <div key={i} className={styles.stat}>
                <div className={styles.statNum}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.profileCol}>
          {profile.avatar && (
            <div className={styles.profileRing}>
              <img src={profile.avatar} alt={profile.firstName} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
