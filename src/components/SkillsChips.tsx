import type { Certificate, SkillGroup } from '../types';
import styles from './SkillsChips.module.css';

interface SkillsChipsProps {
  skillGroups: SkillGroup[];
  certificates: Certificate[];
}

export default function SkillsChips({ skillGroups, certificates }: SkillsChipsProps) {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="container">
        <p className="eyebrow">03 · Skills</p>
        <h2 id="skills-heading" className="section-title">
          Tools of the trade
        </h2>
        <p className="section-intro">
          A working toolkit across frontend development, core programming, and design.
        </p>

        <div className={styles.groups}>
          {skillGroups.map((group) => (
            <div key={group.id} className={styles.group}>
              <h3 className={styles.groupLabel}>{group.groupLabel}</h3>
              <ul className={styles.chipList} aria-label={group.groupLabel}>
                {group.skills.map((skill) => (
                  <li key={skill.name} className={styles.chip}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {certificates.length > 0 && (
          <div className={styles.certs}>
            <h3 className={styles.groupLabel}>Certificates</h3>
            <ul className={styles.certList} role="list">
              {certificates.map((cert) => (
                <li key={cert.id} className={styles.certItem}>
                  <span className={styles.certTitle}>{cert.title}</span>
                  <span className={styles.certMeta}>
                    {cert.issuer} · {cert.year}
                  </span>
                  {cert.detail && <p className={styles.certDetail}>{cert.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
