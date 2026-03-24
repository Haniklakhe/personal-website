import styles from './About.module.css';

export default function About({ profile }) {
  if (!profile) return <div>Loading...</div>;

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>About Me</h2>
          <p className={styles.subtitle}>{profile.highlights?.biography}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            <h3>Background</h3>
            <p>{profile.highlights?.biography}</p>
            <p>{profile.highlights?.expertise}</p>

            <h3 className={styles.skillsTitle}>Skills</h3>
            <div className={styles.skillGroup}>
              <h4>Technical</h4>
              <div className={styles.skillList}>
                {profile.highlights?.skills?.technical?.map((skill, i) => (
                  <span key={i} className={styles.skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className={styles.skillGroup}>
              <h4>Programming</h4>
              <div className={styles.skillList}>
                {profile.highlights?.skills?.programming?.map((skill, i) => (
                  <span key={i} className={styles.skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className={styles.skillGroup}>
              <h4>Languages</h4>
              <div className={styles.skillList}>
                {profile.highlights?.skills?.languages?.map((lang, i) => (
                  <span key={i} className={styles.skill}>{lang}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <h3>Contact</h3>
            <div className={styles.contactInfo}>
              <p>
                <strong>Email:</strong> <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>
              <p>
                <strong>Location:</strong> {profile.location}
              </p>
            </div>

            <h3 className={styles.socTitle}>Connect</h3>
            <div className={styles.social}>
              {profile.social?.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {profile.social?.researchgate && (
                <a href={profile.social.researchgate} target="_blank" rel="noopener noreferrer">
                  ResearchGate
                </a>
              )}
              {profile.social?.orcid && (
                <a href={profile.social.orcid} target="_blank" rel="noopener noreferrer">
                  ORCID
                </a>
              )}
              {profile.social?.github && (
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
