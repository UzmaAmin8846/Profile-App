import { cvData } from './data/cvData';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import SkillsChips from './components/SkillsChips';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero data={cvData} />
        <ProjectsGrid projects={cvData.projects} />
        <SkillsChips skillGroups={cvData.skillGroups} certificates={cvData.certificates} />
        <ContactForm contact={cvData.contact} />
      </main>
      <Footer profile={cvData.profile} />
    </>
  );
}
