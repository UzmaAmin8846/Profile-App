import type { Project } from '../types';
import styles from './ProjectsGrid.module.css';

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <p className="eyebrow">02 · Projects</p>
        <h2 id="projects-heading" className="section-title">
          Things I've built
        </h2>
        <p className="section-intro">
          Academic and final-year work spanning computer vision, real-time systems, and secure
          authentication.
        </p>

        <ul className={styles.grid} role="list">
          {projects.map((project) => (
            <li key={project.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.category}>{project.category}</span>
                <span className={styles.period}>{project.period}</span>
              </div>
              <h3 className={styles.title}>{project.name}</h3>
              <p className={styles.description}>{project.description}</p>
              {project.highlights && (
                <ul className={styles.highlights}>
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
              {project.stack && (
                <ul className={styles.stack} aria-label={`Technologies used in ${project.name}`}>
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}
              {project.link && (
                <a
                  href={project.link}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View project <span aria-hidden="true">→</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
