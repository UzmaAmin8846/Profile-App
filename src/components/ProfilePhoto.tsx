import { useMemo, useState } from 'react';
import styles from './ProfilePhoto.module.css';

interface ProfilePhotoProps {
  photoUrl?: string;
  name: string;
  size?: number;
}

/** Basic structural check — confirms it parses as an absolute http(s) URL
 * before we even attempt to load it as an image. Cheap guard against
 * obviously malformed input (empty strings, stray text, javascript: URIs). */
function isValidImageUrl(url?: string): boolean {
  if (!url) return false;

  const trimmed = url.trim();
  if (!trimmed) return false;

  if (trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.startsWith('../')) {
    return true;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Renders the profile photo from a user-provided URL. If the URL is
 * malformed, missing, or the image fails to load at runtime (broken link,
 * 404, CORS block), it falls back to an initials placeholder instead of
 * showing a broken-image icon.
 */
export default function ProfilePhoto({ photoUrl, name, size = 220 }: ProfilePhotoProps) {
  const [loadFailed, setLoadFailed] = useState(false);
  const urlLooksValid = useMemo(() => isValidImageUrl(photoUrl), [photoUrl]);
  const showImage = urlLooksValid && !loadFailed;

  return (
    <div className={styles.frame} style={{ width: size, height: size }}>
      {showImage ? (
        <img
          src={photoUrl}
          alt={`Portrait of ${name}`}
          className={styles.photo}
          width={size}
          height={size}
          loading="eager"
          onError={() => setLoadFailed(true)}
        />
      ) : (
        <div
          className={styles.placeholder}
          role="img"
          aria-label={`No profile photo available for ${name}`}
        >
          <span aria-hidden="true">{getInitials(name)}</span>
        </div>
      )}
      <span className={styles.ring} aria-hidden="true" />
    </div>
  );
}
