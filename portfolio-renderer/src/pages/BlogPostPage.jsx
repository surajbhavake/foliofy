// import { useParams, Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import { useBlogPost } from '../hooks/useBlogPosts';
// import { usePortfolio } from '../hooks/usePortfolio';
// import ThemeWrapper from '../componenets/ThemeWrapper';
// import Navbar from '../componenets/Navbar';
// import Footer from '../componenets/Footer';

// const BlogPostPage = () => {
//   const { slug } = useParams();
//   const { data: portfolio } = usePortfolio();
//   const { data: post, isLoading, isError } = useBlogPost(slug);

//   if (!portfolio?.profile) return null;

//   const { profile } = portfolio;

//   return (
//     <ThemeWrapper themeName={profile.theme}>
//       <Navbar profile={profile} theme={{}} />
//       <main className="max-w-3xl mx-auto px-4 py-12">
//         {isLoading && <p>Loading post...</p>}
//         {isError && <p className="text-red-500">Post not found.</p>}
//         {post && (
//           <>
//             <Link to="/blog" className="text-indigo-600 hover:underline mb-4 inline-block">&larr; Back to Blog</Link>
//             <h1 className="text-3xl font-bold mt-2">{post.title}</h1>
//             <time className="text-sm text-gray-500 block mt-2 mb-8">
//               {new Date(post.created_at).toLocaleDateString('en-US', {
//                 year: 'numeric', month: 'long', day: 'numeric'
//               })}
//             </time>
//             <article className="prose max-w-none">
//               <ReactMarkdown>{post.content}</ReactMarkdown>
//             </article>
//           </>
//         )}
//       </main>
//       <Footer profile={profile} theme={{}} />
//     </ThemeWrapper>
//   );
// };

// export default BlogPostPage;



import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useBlogPost } from '../hooks/useBlogPosts'
import { usePortfolio } from '../hooks/usePortfolio'
import ThemeWrapper from '../componenets/ThemeWrapper'
import Navbar from '../componenets/Navbar'
import Footer from '../componenets/Footer'
import { useTheme } from '../componenets/ThemeWrapper'

const IconArrowLeft = (props) => (
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
    <path d="M19 12H5" />
    <path d="M11 6l-6 6 6 6" />
  </svg>
)

const IconAlert = (props) => (
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
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
)

function PostSkeleton() {
  return (
    <div role="status" aria-label="Loading post" className="animate-pulse">
      <span className="sr-only">Loading post…</span>
      <div className="h-4 w-24 rounded bg-current/[0.08]" aria-hidden="true" />
      <div className="mt-6 h-9 w-3/4 rounded bg-current/[0.08]" aria-hidden="true" />
      <div className="mt-3 h-4 w-32 rounded bg-current/[0.08]" aria-hidden="true" />
      <div className="mt-10 space-y-3" aria-hidden="true">
        <div className="h-4 w-full rounded bg-current/[0.06]" />
        <div className="h-4 w-full rounded bg-current/[0.06]" />
        <div className="h-4 w-5/6 rounded bg-current/[0.06]" />
      </div>
    </div>
  )
}

function NotFoundState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-current/[0.15] px-6 py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-400/30 bg-rose-500/10 text-rose-400">
        <IconAlert className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-current/70">Post not found</p>
        <p className="mt-1 text-sm text-current/40">It may have been moved or removed.</p>
      </div>
      <Link
        to="/blog"
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 transition-colors duration-200 hover:text-amber-400 dark:text-amber-300 dark:hover:text-amber-200"
      >
        <IconArrowLeft className="h-3.5 w-3.5" />
        Back to blog
      </Link>
    </div>
  )
}

const BlogPostPage = () => {
  const { slug } = useParams()
  const { data: portfolio } = usePortfolio()
  const { data: post, isLoading, isError } = useBlogPost(slug)

  if (!portfolio?.profile) return null

  const { profile } = portfolio
  const theme = useTheme(profile.theme)

  return (
    <ThemeWrapper themeName={profile.theme}>
      <Navbar profile={profile} theme={theme} />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        {isLoading && <PostSkeleton />}
        {isError && <NotFoundState />}

        {post && (
          <>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-current/50 transition-colors duration-200 hover:text-amber-500 dark:hover:text-amber-300"
            >
              <IconArrowLeft className="h-3.5 w-3.5" />
              Back to blog
            </Link>

            <h1 className={`mt-5 text-3xl font-bold sm:text-4xl ${theme.text}`}>{post.title}</h1>

            <time
              dateTime={post.created_at}
              className="mb-10 mt-3 block font-mono text-xs uppercase tracking-wide text-current/40"
            >
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-amber-500 dark:prose-a:text-amber-300">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
          </>
        )}
      </main>

      <Footer profile={profile} theme={theme} />
    </ThemeWrapper>
  )
}

export default BlogPostPage