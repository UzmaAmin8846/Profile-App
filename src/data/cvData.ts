import type { CvData } from '../types';

/**
 * Single source of truth for site content.
 *
 * To edit: change the fields below directly, OR replace this whole object
 * by fetching a JSON file that matches the `CvData` shape — see
 * `loadCvData()` at the bottom of this file for a drop-in async loader
 * (e.g. `fetch('/cv.json')`) if you'd rather manage content outside code.
 */
export const cvData: CvData = {
  profile: {
    name: 'Uzma Amin',
    title: 'Frontend Developer | UI/UX Designer | Computer Science Graduate',
    summary:
      'Front-end developer and UI/UX designer with hands-on experience building responsive, user-friendly web interfaces in React.js, JavaScript, and Tailwind/Bootstrap. Skilled at translating design concepts into clean, functional code using Figma and modern front-end tools, with additional experience in WordPress design and video production. Detail-oriented and collaborative, with a strong drive to keep growing as a developer who balances usability with visual polish.',
    // Replace with a real hosted image URL (e.g. from Behance/LinkedIn or your own CDN).
    photoUrl: '',
    location: 'Mardan, Pakistan',
  },
  contact: {
    email: 'meenakhan8846@gmail.com',
    phone: '+92 311-9471040',
    location: 'Mardan, Pakistan',
    // Add a hosted PDF URL here to enable direct-file download; otherwise
    // the Download CV button generates a printable HTML resume instead.
    cvFileUrl: '',
    links: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/uzma-amin-ba348331b', icon: 'linkedin' },
      { label: 'Behance', url: 'https://behance.net/meenakhan10', icon: 'behance' },
      { label: 'Email', url: 'mailto:meenakhan8846@gmail.com', icon: 'email' },
      { label: 'Phone', url: 'tel:+923119471040', icon: 'phone' },
    ],
  },
  experience: [
    {
      id: 'exp-isd',
      role: 'Web Developer Intern',
      company: 'Intelligent System Design (Pvt.) Ltd.',
      mode: 'On-site, UET Mardan',
      startDate: 'Apr 2026',
      endDate: 'Jun 2026',
      highlights: [
        'Developed responsive websites using React.js, JavaScript, HTML, CSS, and Tailwind CSS.',
        'Converted UI/UX designs into responsive and user-friendly web interfaces.',
        'Collaborated with team members to implement and enhance web application features.',
        'Created digital assets, presentations, and marketing materials for client projects.',
      ],
    },
    {
      id: 'exp-logicloomer',
      role: 'Frontend Developer Intern',
      company: 'Logic Loomer',
      mode: 'On-site',
      startDate: 'Apr 2026',
      endDate: 'Jun 2026',
      highlights: [
        'Developed and maintained responsive web applications using React.js, JavaScript, HTML, CSS, and Node.js.',
        'Collaborated with the development team on client projects, implementing responsive and user-friendly interfaces.',
        'Designed and translated UI/UX mockups into functional, interactive web pages.',
        'Fixed bugs, optimized performance, and contributed to improving the overall user experience.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-bscs',
      credential: 'Bachelor of Computer Science',
      institution: 'University of Engineering & Technology, Mardan',
      detail: "CGPA 3.32 — Dean's List Awardee (2023–2024, 2025)",
      startDate: '2022',
      endDate: '2026',
    },
    {
      id: 'edu-dit',
      credential: 'Diploma in Information Technology (DIT)',
      institution: 'Government College of Management Sciences, Mardan (KP Board of Technical & Commerce Education, Peshawar)',
      detail: 'Grade A — 1118/1400 marks',
      startDate: '2020',
      endDate: '2022',
    },
    {
      id: 'edu-fsc',
      credential: 'FSc Computer Science',
      institution: 'Government Girls Degree College Sheikh Maltoon, Mardan',
      startDate: '2020',
      endDate: '2022',
    },
  ],
  projects: [
    {
      id: 'proj-driver-alert',
      name: 'Real-Time Driver Behavior & Emergency Alert System',
      category: 'Final Year Project',
      period: '2024 – 2025',
      description:
        'An AI-powered mobile application that monitors driver behavior in real time to improve road safety.',
      highlights: [
        'Implemented YOLOv8, OpenCV, and LSTM models to detect drowsiness, distraction, and driver fatigue.',
        'Integrated GPS and smartphone sensors to detect overspeeding and unsafe driving, triggering instant visual and audio alerts.',
        'Enabled automatic emergency alerts by sharing the driver\u2019s live location with pre-registered contacts or emergency services (e.g., Rescue 1122).',
      ],
      stack: ['YOLOv8', 'OpenCV', 'LSTM', 'GPS', 'Mobile'],
    },
    {
      id: 'proj-multichat',
      name: 'Multi-Chat System',
      category: 'Academic Project',
      period: '2024 – 2025',
      description:
        'A multi-chat system enabling real-time communication between multiple users, supporting text, emojis, and voice messages for a seamless experience.',
      stack: ['React', 'Real-time messaging'],
    },
    {
      id: 'proj-mfa',
      name: 'Multi-Factor Authentication System',
      category: 'Academic Project',
      period: '2024 – 2025',
      description:
        'A two-step login system built with Flask: users authenticate with a password and verify with an email OTP for added security.',
      stack: ['Flask', 'Python', 'OTP'],
    },
  ],
  skillGroups: [
    {
      id: 'group-frontend',
      groupLabel: 'Frontend Developer',
      skills: [
        { name: 'HTML5' },
        { name: 'CSS' },
        { name: 'JavaScript' },
        { name: 'Tailwind CSS' },
        { name: 'Bootstrap' },
        { name: 'React.js' },
        { name: 'Git' },
      ],
    },
    {
      id: 'group-languages',
      groupLabel: 'Programming Languages',
      skills: [{ name: 'C / C++' }, { name: 'Python' }, { name: 'Java' }],
    },
    {
      id: 'group-design',
      groupLabel: 'Design & Tools',
      skills: [
        { name: 'Figma (UI/UX Design)' },
        { name: 'WordPress' },
        { name: 'Adobe Premiere Pro' },
        { name: 'CapCut' },
      ],
    },
  ],
  certificates: [
    {
      id: 'cert-deans-list',
      title: "Dean's List (2024, 2025)",
      issuer: 'UET Mardan',
      year: '2024–2025',
      detail: 'Recognized for outstanding academic performance with a GPA of 3.60/4.00.',
    },
    {
      id: 'cert-bi',
      title: 'Business Intelligence & Data Visualization',
      issuer: 'GIK',
      year: '2024',
    },
    {
      id: 'cert-figma',
      title: 'UI/UX Designing in Figma',
      issuer: 'UET Mardan',
      year: '2022',
    },
  ],
};

/**
 * Optional loader for teams that prefer to manage content as a JSON file
 * instead of editing TypeScript. Drop a `cv.json` (matching the `CvData`
 * shape) into `/public`, then call `loadCvData()` instead of importing
 * `cvData` directly, e.g. inside a `useEffect` in `App.tsx`.
 */
export async function loadCvData(jsonUrl = '/cv.json'): Promise<CvData> {
  const response = await fetch(jsonUrl);
  if (!response.ok) {
    throw new Error(`Failed to load CV data from ${jsonUrl}: ${response.status}`);
  }
  return (await response.json()) as CvData;
}
