import {Link} from 'react-router-dom'

const Navbar = ({profile,theme})=>{
    return(
        <nav className={`${theme.card} ${theme.cardBorder} shadow-sm`}>
            <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to='/'  className="text-xl font-bold">{profile.name}</Link>
                <div className="space-x-4">
                    <Link to = '/#projects' className="hover:underline">Projects</Link>
                    <Link to = '/#skills' className="hover:underline">Skills</Link>
                    <Linik to = 'blog' className="hover:underline">Blog</Linik>

                    {profile.resume && (
                        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="hover:underline">Resume</a>
                    )}
                </div>
            </div>
        </nav>
    )
}