import { useState } from 'react';
import type { CvData } from '../types';
import { downloadCv } from '../utils/generateResume';
import styles from './DownloadCvButton.module.css';

interface DownloadCvButtonProps {
  data: CvData;
  variant?: 'primary' | 'secondary';
}

export default function DownloadCvButton({ data, variant = 'primary' }: DownloadCvButtonProps) {
  const [status, setStatus] = useState<'idle' | 'done'>('idle');
  const hasHostedFile = Boolean(data.contact.cvFileUrl?.trim());

  const handleClick = () => {
    downloadCv(data);
    setStatus('done');
    window.setTimeout(() => setStatus('idle'), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles.button} ${variant === 'secondary' ? styles.secondary : ''}`}
      aria-describedby="cv-download-note"
    >
      <span aria-hidden="true">⬇</span>
      {status === 'done' ? 'Downloaded' : 'Download CV'}
      <span id="cv-download-note" className="visually-hidden">
        {hasHostedFile
          ? 'Downloads the CV as a PDF file.'
          : 'Generates and downloads a printable HTML resume you can save as PDF.'}
      </span>
    </button>
  );
}
