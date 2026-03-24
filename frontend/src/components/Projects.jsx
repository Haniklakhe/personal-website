import styles from './Projects.module.css';

export default function Projects({ items }) {
  if (!items) return <div>Loading...</div>;

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Projects</h2>
          <p className={styles.subtitle}>Research and professional work</p>
        </div>

        <div className={styles.grid}>
          {items.map((project) => (
            <article key={project.id} className={styles.card}>
              {project.image && (
                <img src={project.image} alt={project.title} className={styles.image} />
              )}
              <div className={styles.content}>
                <div className={styles.category}>{project.category}</div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.shortDescription}</p>
                
                {project.tags && (
                  <div className={styles.tags}>
                    {project.tags.map((tag, i) => (
                      <span key={i} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
                
                <div className={styles.footer}>
                  <span className={`${styles.status} ${styles[project.status?.toLowerCase()]}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
