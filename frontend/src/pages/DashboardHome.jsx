import { useProfile } from '../hooks/useProfile';
import { useProjects } from '../hooks/useProjects';
import { useSkills } from '../hooks/useSkills';
import { useBlogPosts } from '../hooks/useBlogPosts';
import {Link} from 'react-router-dom'

const DashboardHome = () => {

    const {data : profile , isLoading :profileLoading } = useProfile();
    const {data:skills, isLoading:skillsLoading} = useSkills();
    const {data:projects , isLoading : projectsLoading} = useProjects();
    const {data : posts , isLoading : postsLoading} = useBlogPosts(); 

    if(profileLoading) return <div>Loading....</div>

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6 '>Welcome, {profile?.full_name || 'Developer'}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StarCard title= 'Projects' count={projects?.length || 0} link = "/dashboard/projects"/>
                <StarCard title ='Skills' count = {skills?.length || 0} link='/dashboard/skills'/>
                <StarCard title ='Blog Posts' count={posts?.length || 0} link='/dashboard/blogpost'/>
                <StarCard title = 'Profile' status={profile ? "Complete" : 'Incomplete'} link = '/dashboard/profile'/>
            </div>
        </div>
    )
}

const StarCard = ({title,status,count,link}) =>(
<Link to={link} className='bg-white p-5 rounded shadow hover:shadow-lg transition'>

<h2 className='text-lg  text-gray-500'>{title}</h2>
<p className='text-3xl font-semibold'>{count || status}</p>
</Link>
) 


export default DashboardHome;