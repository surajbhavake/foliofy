import {Link} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

const Navbar = ({profile,theme})=>{
    return(
        <nav className={`${theme.card} ${theme.cardBorder} shadow-sm`}>
            <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to='/'  className="text-xl font-bold">{profile.full_name}</Link>
                <div className="space-x-4">
                    <HashLink smooth to="/#projects">
    Projects
</HashLink>

<HashLink smooth to="/#skills">
    Skills
</HashLink>
                    <Link to = '/blog' className="hover:underline">Blog</Link>

                    {profile.resume && (
                        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="hover:underline">Resume</a>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;