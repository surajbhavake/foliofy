import { usePortfolio } from '../hooks/usePortfolio';
import {ThemeWrapper,useTheme} from '../componenets/ThemeWrapper';
import Navbar from '../componenets/Navbar';
import HeroSection from '../componenets/HeroSection';
import AboutSection from '../componenets/AboutSection';
import SkillsSection from '../componenets/SkillsSection';
import ProjectsSection from '../componenets/ProjectsSection';
import ExperienceSection from '../componenets/ExperienceSection';
import ContactSection from '../componenets/ContactSection';
import Footer from '../componenets/Footer';

const HomePage = () =>{
    const {data,isLoading,isError} = usePortfolio()
    
    
    if(isLoading){
        return(
            <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-xl">
                Loading portfolio....
            </div>
        </div>
        )
    }


    if (isError || !data?.profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">404</h1>
          <p className="text-gray-500">Portfolio not found.</p>
        </div>
      </div>
    );
  }

  const {profile,projects,skills,experiences} = data
  const theme = useTheme(profile.theme)


  return(
    <ThemeWrapper themeName = {profile.theme}>
        <Navbar profile = {profile} theme = {theme}/>
        <ExperienceSection experiences={experiences} />
        <HeroSection profile={profile} theme={theme}/>
        <ContactSection profile={profile} />
        <AboutSection profile={profile} theme={theme}/>
        <SkillsSection skills = {skills} theme={theme}/>
        <ProjectsSection projects = {projects} theme={theme}/>
        <Footer profile={profile} theme={theme}/>

    </ThemeWrapper>
  )
}

export default HomePage