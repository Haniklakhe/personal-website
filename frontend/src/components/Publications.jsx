import styles from './Publications.module.css';

export default function Publications({ items }) {
  if (!items) return <div>Loading...</div>;

  const groupedByYear = items.reduce((acc, pub) => {
    const year = pub.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(pub);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedByYear).sort().reverse();

  return (
    <section id="publications" className={styles.publications}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Publications</h2>
          <p className={styles.subtitle}>Research articles and conference presentations</p>
        </div>

        {sortedYears.map((year) => (
          <div key={year} className={styles.yearGroup}>
            <h3 className={styles.year}>{year}</h3>
            <div className={styles.list}>
              {groupedByYear[year].map((pub) => (
                <article key={pub.id} className={styles.item}>
                  <div className={styles.badge}>{pub.type}</div>
                  <div className={styles.content}>
                    <h4 className={styles.title}>
                      <a href={pub.url} target="_blank" rel="noopener noreferrer">
                        {pub.title}
                      </a>
                    </h4>
                    <p className={styles.authors}>{pub.authors}</p>
                    <p className={styles.venue}>
                      {pub.journal} {pub.volume && `Vol. ${pub.volume}`}
                      {pub.pages && `, pp. ${pub.pages}`}
                    </p>
                    {pub.doi && (
                      <code className={styles.doi}>{pub.doi}</code>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
