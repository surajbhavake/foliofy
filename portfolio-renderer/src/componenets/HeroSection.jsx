const HeroSection = ({profile,theme})=>{
    return(
        <section className="max-w-5xl mx-auto px-4 py-20 text-center">
            {profile.avatar && (
                <img src={profile.avatar} alt={profile.full_name} 
                 className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-gray-200"
                />
            )}

            <h1 className={theme.heading}>{profile.full_name}</h1>
            <p className={`mt-4 ${theme.subheading}`}>{profile.headline}</p>
            <div  className="flex justify-center space-x-4 mt-6">
                {profile.github && (<SocialLink href = {profile.github} label = 'Github'/>)}
                {profile.linkedin && <SocialLink href = {profile.linkedin} label = "LinkedIn"/>}
                {profile.twitter && <SocialLink href = {profile.twitter} label ='Twitter'/>}
                {profile.website && <SocialLink href = {profile.website} label = 'Webite'/>}
            </div>
        </section>
    )
}

const SocialLink = ({href,label}) =>(
    <a href={href} target="_blank" rel="noopener onreferrer"  className="text-indigo-500 hover:text-indigo-700 underline">{label}</a>
)


export default HeroSection;



import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiGlobe } from 'react-icons/fi';

const socialIcons = {
  Github: FiGithub,
  LinkedIn: FiLinkedin,
  Twitter: FiTwitter,
  Website: FiGlobe,
};

const SocialLink = ({ href, label }) => {
  const Icon = socialIcons[label];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 text-gray-500 bg-white shadow-sm transition-all duration-200 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5"
    >
      {Icon ? <Icon size={18} /> : label}
    </a>
  );
};

const HeroSection = ({ profile, theme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation once, right after mount
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative max-w-5xl mx-auto px-4 py-24 text-center overflow-hidden">
      {/* Soft decorative glow behind the hero, pure CSS gradient */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-indigo-100 via-indigo-50 to-transparent blur-3xl opacity-70" />

      <div
        className={`relative transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {profile.avatar && (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-200 p-1">
              <img
                src={profile.avatar}
                alt={profile.full_name}
                loading="lazy"
                className="w-full h-full rounded-full object-cover border-4 border-white transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        )}

        <h1 className={theme.heading}>{profile.full_name}</h1>
        <p className={`mt-4 ${theme.subheading}`}>{profile.headline}</p>

        <div className="flex justify-center gap-3 mt-8">
          {profile.github && <SocialLink href={profile.github} label="Github" />}
          {profile.linkedin && <SocialLink href={profile.linkedin} label="LinkedIn" />}
          {profile.twitter && <SocialLink href={profile.twitter} label="Twitter" />}
          {profile.website && <SocialLink href={profile.website} label="Website" />}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;