import type { CvData } from '../types';

/** Minimal HTML-escaping so CV data can never break the generated markup. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Builds a clean, print-ready HTML resume from the CvData model.
 * Used as the fallback for the "Download CV" button when `contact.cvFileUrl`
 * isn't set — the user can print it to PDF from the browser's print dialog,
 * which every modern browser supports natively (Ctrl/Cmd+P → Save as PDF).
 */
export function buildResumeHtml(data: CvData): string {
  const { profile, contact, experience, education, projects, skillGroups, certificates } = data;

  const experienceHtml = experience
    .map(
      (exp) => `
      <section class="entry">
        <div class="entry-head">
          <h3>${esc(exp.role)} — ${esc(exp.company)}</h3>
          <span class="dates">${esc(exp.startDate)} – ${esc(exp.endDate)}</span>
        </div>
        ${exp.mode ? `<p class="meta">${esc(exp.mode)}</p>` : ''}
        <ul>${exp.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      </section>`,
    )
    .join('');

  const educationHtml = education
    .map(
      (ed) => `
      <section class="entry">
        <div class="entry-head">
          <h3>${esc(ed.credential)}</h3>
          <span class="dates">${esc(ed.startDate)} – ${esc(ed.endDate)}</span>
        </div>
        <p class="meta">${esc(ed.institution)}</p>
        ${ed.detail ? `<p class="meta">${esc(ed.detail)}</p>` : ''}
      </section>`,
    )
    .join('');

  const projectsHtml = projects
    .map(
      (p) => `
      <section class="entry">
        <div class="entry-head">
          <h3>${esc(p.name)}</h3>
          <span class="dates">${esc(p.period)}</span>
        </div>
        <p class="meta">${esc(p.category)}</p>
        <p>${esc(p.description)}</p>
        ${p.highlights ? `<ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
        ${p.stack ? `<p class="stack">${p.stack.map(esc).join(' • ')}</p>` : ''}
      </section>`,
    )
    .join('');

  const skillsHtml = skillGroups
    .map(
      (g) => `
      <div class="skill-group">
        <h4>${esc(g.groupLabel)}</h4>
        <p>${g.skills.map((s) => esc(s.name)).join(' • ')}</p>
      </div>`,
    )
    .join('');

  const certsHtml = certificates
    .map(
      (c) => `<li><strong>${esc(c.title)}</strong> — ${esc(c.issuer)} (${esc(c.year)})${
        c.detail ? `<br /><span class="meta">${esc(c.detail)}</span>` : ''
      }</li>`,
    )
    .join('');

  const linksHtml = contact.links
    .map((l) => `<a href="${esc(l.url)}">${esc(l.label)}</a>`)
    .join(' &nbsp;|&nbsp; ');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(profile.name)} — Resume</title>
<style>
  @page { margin: 24mm 18mm; }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    color: #1c1b29;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 24px;
    line-height: 1.5;
  }
  h1 { font-size: 1.8rem; margin: 0 0 4px; }
  .title { color: #4a4860; font-size: 1rem; margin-bottom: 8px; }
  .contact-line { font-size: 0.9rem; color: #4a4860; margin-bottom: 24px; }
  .contact-line a { color: #4b3fc7; text-decoration: none; }
  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #4b3fc7;
    border-bottom: 2px solid #e6e3dd;
    padding-bottom: 6px;
    margin: 28px 0 14px;
  }
  h3 { font-size: 1.02rem; margin: 0; }
  .entry { margin-bottom: 16px; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
  .dates { font-size: 0.85rem; color: #8b899e; white-space: nowrap; }
  .meta { font-size: 0.88rem; color: #4a4860; margin: 2px 0 6px; }
  .stack { font-size: 0.82rem; color: #8b899e; margin-top: 4px; }
  ul { margin: 6px 0 0; padding-left: 20px; }
  li { margin-bottom: 4px; font-size: 0.92rem; }
  .skills-grid { display: flex; flex-wrap: wrap; gap: 24px; }
  .skill-group { min-width: 200px; }
  .skill-group h4 { margin: 0 0 4px; font-size: 0.9rem; }
  .skill-group p { margin: 0; font-size: 0.88rem; color: #4a4860; }
  p { margin: 4px 0; font-size: 0.92rem; }
  @media print {
    a { color: inherit; text-decoration: none; }
  }
</style>
</head>
<body>
  <h1>${esc(profile.name)}</h1>
  <p class="title">${esc(profile.title)}</p>
  <p class="contact-line">
    ${esc(contact.location)} &nbsp;•&nbsp; ${esc(contact.email)}${contact.phone ? ` &nbsp;•&nbsp; ${esc(contact.phone)}` : ''}
    <br />${linksHtml}
  </p>

  <h2>Summary</h2>
  <p>${esc(profile.summary)}</p>

  <h2>Experience</h2>
  ${experienceHtml}

  <h2>Projects</h2>
  ${projectsHtml}

  <h2>Education</h2>
  ${educationHtml}

  <h2>Skills</h2>
  <div class="skills-grid">${skillsHtml}</div>

  ${certsHtml ? `<h2>Certificates</h2><ul>${certsHtml}</ul>` : ''}
</body>
</html>`;
}

/**
 * Downloads the CV. If `contact.cvFileUrl` is set, opens/downloads that
 * file directly. Otherwise generates a printable HTML resume client-side
 * and downloads it as a .html file the user can open and print to PDF.
 */
export function downloadCv(data: CvData): void {
  const fileUrl = data.contact.cvFileUrl?.trim();

  if (fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${data.profile.name.replace(/\s+/g, '_')}_CV.pdf`;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  const html = buildResumeHtml(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.profile.name.replace(/\s+/g, '_')}_Resume.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
