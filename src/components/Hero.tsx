import type { CvData } from '../types';
import ProfilePhoto from './ProfilePhoto';
import DownloadCvButton from './DownloadCvButton';
import styles from './Hero.module.css';

interface HeroProps {
  data: CvData;
}

export default function Hero({ data }: HeroProps) {
  const { profile, contact, experience, education } = data;

  return (
    <>
      <section id="home" className={styles.hero} aria-label="Introduction">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <p className="eyebrow">
              <span aria-hidden="true">&lt;/&gt;</span> Frontend Developer &amp; UI/UX Designer
            </p>
            <h1 className={styles.name}>{profile.name}</h1>
            <p className={styles.tagline}>{profile.title}</p>
            <p className={styles.summary}>{profile.summary}</p>
            <div className={styles.actions}>
              <a href="#projects" className={styles.primaryCta}>
                View projects
              </a>
              <DownloadCvButton data={data} variant="secondary" />
            </div>
            <p className={styles.locationLine}>
              <span aria-hidden="true">📍</span> {contact.location}
            </p>
          </div>
          <div className={styles.heroPhoto}>
            <ProfilePhoto photoUrl={profile.photoUrl} name={profile.name} size={260} />
          </div>
        </div>
      </section>

      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="container">
          <p className="eyebrow">01 · About</p>
          <h2 id="about-heading" className="section-title">
            Building interfaces people actually enjoy using
          </h2>
          <p className="section-intro">
            A quick look at where {profile.name.split(' ')[0]}'s hands-on experience and education
            come from.
          </p>

          <div className={styles.aboutGrid}>
            <div>
              <h3 className={styles.blockHeading}>Experience</h3>
              <ol className={styles.timeline} role="list">
                {experience.map((exp) => (
                  <li key={exp.id} className={styles.timelineItem}>
                    <div className={styles.timelineHead}>
                      <span className={styles.timelineRole}>{exp.role}</span>
                      <span className={styles.timelineDates}>
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className={styles.timelineCompany}>
                      {exp.company}
                      {exp.mode ? ` · ${exp.mode}` : ''}
                    </p>
                    <ul className={styles.timelineHighlights}>
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className={styles.blockHeading}>Education</h3>
              <ol className={styles.timeline} role="list">
                {education.map((ed) => (
                  <li key={ed.id} className={styles.timelineItem}>
                    <div className={styles.timelineHead}>
                      <span className={styles.timelineRole}>{ed.credential}</span>
                      <span className={styles.timelineDates}>
                        {ed.startDate} – {ed.endDate}
                      </span>
                    </div>
                    <p className={styles.timelineCompany}>{ed.institution}</p>
                    {ed.detail && <p className={styles.timelineDetail}>{ed.detail}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
