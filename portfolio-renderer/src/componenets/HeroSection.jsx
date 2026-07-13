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