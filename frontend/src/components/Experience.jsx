import styles from './Experience.module.css';

export default function Experience({ items }) {
  if (!items) return <div>Loading...</div>;

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Experience</h2>
          <p className={styles.subtitle}>Professional journey and key milestones</p>
        </div>

        <div className={styles.timeline}>
          {items.map((item) => (
            <div key={item.id} className={`${styles.item} ${item.current ? styles.current : ''}`}>
              <div className={styles.period}>{item.period}</div>
              <div className={styles.content}>
                <h3 className={styles.role}>{item.role}</h3>
                <p className={styles.org}>{item.organization}</p>
                {item.description && <p className={styles.desc}>{item.description}</p>}
                <ul className={styles.list}>
                  {item.responsibilities?.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
