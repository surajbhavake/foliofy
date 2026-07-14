import { Link } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { usePortfolio } from '../hooks/usePortfolio';
import ThemeWrapper from '../componenets/ThemeWrapper';
import Navbar from '../componenets/Navbar';
import Footer from '../componenets/Footer';
import { useTheme } from '../componenets/ThemeWrapper';

const BlogListPage = () =>{
    const {data:portfolio} = usePortfolio()
    const {data:posts,isLoading} = useBlogPosts()


    if(!portfolio?.profile) return null

    const {profile} = portfolio;
    const theme = useTheme(portfolio.profile)

    return(
        <ThemeWrapper themeName = {profile.theme}>
            <Navbar profile = {profile} theme = {profile.theme}/>
            <main className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Blog</h1>
                {isLoading ? (
                    <p>Loading posts...</p>
                ) : posts?.length? (
                    <div className="space-y-6">
                        {posts.map((post)=>(
                            <Link key={post.slug} to={`/blog/${post.slug}`} className='block group'>
                                <article className="p-4 rounded border hover:shadow transition">
                                    <h2 className="text-xl font-semibold group-hover:text-indigo-600">{post.title}</h2>
                                    <time className="text-sm text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString('en-Us',{
                                            year:'numeric',month:'long',day:'numeric'
                                        })}
                                    </time>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No blog post yet</p>
                )}
            </main>

            <Footer profile = {profile} theme = {theme}/>
            
        </ThemeWrapper>
    )
}

export default BlogListPage