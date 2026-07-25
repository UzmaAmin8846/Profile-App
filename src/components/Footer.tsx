import type { Profile } from '../types';
import styles from './Footer.module.css';

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React &amp; TypeScript.
        </p>
        <a href="#home" className={styles.backToTop}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
