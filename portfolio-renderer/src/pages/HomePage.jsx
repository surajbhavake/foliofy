import { usePortfolio } from '../hooks/usePortfolio';
import { ThemeWrapper, useTheme } from '../componenets/ThemeWrapper';
import Navbar from '../componenets/Navbar';
import HeroSection from '../componenets/HeroSection';
import AboutSection from '../componenets/AboutSection';
import SkillsSection from '../componenets/SkillsSection';
import ProjectsSection from '../componenets/ProjectsSection';
import ExperienceSection from '../componenets/ExperienceSection';
import ContactSection from '../componenets/ContactSection';
import Footer from '../componenets/Footer';

const PulseBlock = ({ className }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 motion-reduce:animate-none ${className}`} />
);

const PortfolioSkeleton = () => (
  <div className="min-h-screen bg-white">
    {/* Navbar placeholder */}
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-8">
      <PulseBlock className="h-6 w-32" />
      <div className="hidden gap-6 sm:flex">
        <PulseBlock className="h-4 w-14" />
        <PulseBlock className="h-4 w-14" />
        <PulseBlock className="h-4 w-14" />
      </div>
    </div>

    {/* Hero placeholder */}
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center">
      <PulseBlock className="mb-6 h-32 w-32 rounded-full" />
      <PulseBlock className="mb-3 h-7 w-56" />
      <PulseBlock className="h-4 w-72" />
      <div className="mt-8 flex gap-3">
        <PulseBlock className="h-11 w-11 rounded-full" />
        <PulseBlock className="h-11 w-11 rounded-full" />
        <PulseBlock className="h-11 w-11 rounded-full" />
      </div>
    </div>
  </div>
);

const NotFoundIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 1.3-1.2 1.8-2 2.4-.5.4-.5.9-.5 1.4" />
    <path d="M12 17h.01" />
  </svg>
);

const HomePage = () => {
  const { data, isLoading, isError } = usePortfolio();

  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  if (isError || !data?.profile) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <NotFoundIcon className="h-7 w-7" />
          </span>
          <h1 className="mb-2 text-2xl font-semibold text-gray-800">Portfolio not found</h1>
          <p className="max-w-sm text-sm text-gray-500">
            We couldn't find a portfolio at this address. Double-check the link, or the owner may
            not have published it yet.
          </p>
        </div>
      </div>
    );
  }

  const { profile, projects, skills, experiences } = data;
  const theme = useTheme(profile.theme);

  return (
    <ThemeWrapper themeName={profile.theme}>
      <Navbar profile={profile} theme={theme} />
      <HeroSection profile={profile} theme={theme} />
      <AboutSection profile={profile} theme={theme} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} theme={theme} />
      <SkillsSection skills={skills} theme={theme} />
      <ContactSection profile={profile} theme={theme} />
      <Footer profile={profile} theme={theme} />
    </ThemeWrapper>
  );
};

export default HomePage;