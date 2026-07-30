// import { Link } from 'react-router-dom';
// import { useBlogPosts } from '../hooks/useBlogPosts';
// import { usePortfolio } from '../hooks/usePortfolio';
// import ThemeWrapper from '../componenets/ThemeWrapper';
// import Navbar from '../componenets/Navbar';
// import Footer from '../componenets/Footer';
// import { useTheme } from '../componenets/ThemeWrapper';

// const BlogListPage = () =>{
//     const {data:portfolio} = usePortfolio()
//     const {data:posts,isLoading} = useBlogPosts()


//     if(!portfolio?.profile) return null

//     const {profile} = portfolio;
//     const theme = useTheme(portfolio.profile)

//     return(
//         <ThemeWrapper themeName = {profile.theme}>
//             <Navbar profile = {profile} theme = {profile.theme}/>
//             <main className="max-w-3xl mx-auto px-4 py-12">
//                 <h1 className="text-3xl font-bold mb-8">Blog</h1>
//                 {isLoading ? (
//                     <p>Loading posts...</p>
//                 ) : posts?.length? (
//                     <div className="space-y-6">
//                         {posts.map((post)=>(
//                             <Link key={post.slug} to={`/blog/${post.slug}`} className='block group'>
//                                 <article className="p-4 rounded border hover:shadow transition">
//                                     <h2 className="text-xl font-semibold group-hover:text-indigo-600">{post.title}</h2>
//                                     <time className="text-sm text-gray-500">
//                                         {new Date(post.created_at).toLocaleDateString('en-Us',{
//                                             year:'numeric',month:'long',day:'numeric'
//                                         })}
//                                     </time>
//                                 </article>
//                             </Link>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-500">No blog post yet</p>
//                 )}
//             </main>

//             <Footer profile = {profile} theme = {theme}/>
            
//         </ThemeWrapper>
//     )
// }

// export default BlogListPage



import { Link } from 'react-router-dom'
import { useBlogPosts } from '../hooks/useBlogPosts'
import { usePortfolio } from '../hooks/usePortfolio'
import ThemeWrapper from '../componenets/ThemeWrapper'
import Navbar from '../componenets/Navbar'
import Footer from '../componenets/Footer'
import { useTheme } from '../componenets/ThemeWrapper'

const IconArrowRight = (props) => (
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
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)

const IconDoc = (props) => (
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
    <path d="M7 4h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
    <path d="M14 4v4h4" />
    <path d="M9 12h6" />
    <path d="M9 15.5h6" />
  </svg>
)

function PostsSkeleton() {
  return (
    <div role="status" aria-label="Loading posts" className="space-y-4">
      <span className="sr-only">Loading posts…</span>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-2xl bg-current/[0.05]" aria-hidden="true" />
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-current/[0.15] px-6 py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-current/10 bg-current/[0.04] text-current/40">
        <IconDoc className="h-5 w-5" />
      </div>
      <p className="text-sm text-current/50">No blog posts yet. Check back soon.</p>
    </div>
  )
}

const BlogListPage = () => {
  const { data: portfolio } = usePortfolio()
  const { data: posts, isLoading } = useBlogPosts()

  if (!portfolio?.profile) return null

  const { profile } = portfolio
  const theme = useTheme(profile.theme)

  return (
    <ThemeWrapper themeName={profile.theme}>
      <Navbar profile={profile} theme={theme} />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-current/20" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-current/40">Writing</span>
        </div>
        <h1 className={`mb-8 text-3xl font-bold sm:text-4xl ${theme.text}`}>Blog</h1>

        {isLoading ? (
          <PostsSkeleton />
        ) : posts?.length ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
                <article
                  className={`rounded-2xl p-5 ${theme.card} ${theme.cardBorder} border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2
                        className={`text-lg font-semibold transition-colors duration-200 group-hover:text-amber-500 dark:group-hover:text-amber-300 sm:text-xl ${theme.text}`}
                      >
                        {post.title}
                      </h2>
                      <time
                        dateTime={post.created_at}
                        className="mt-1.5 block font-mono text-xs uppercase tracking-wide text-current/40"
                      >
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <IconArrowRight className="mt-1 h-4 w-4 shrink-0 text-current/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-amber-500 dark:group-hover:text-amber-300" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>

      <Footer profile={profile} theme={theme} />
    </ThemeWrapper>
  )
}

export default BlogListPage