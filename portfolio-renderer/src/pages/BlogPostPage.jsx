import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useBlogPost } from '../hooks/useBlogPosts';
import { usePortfolio } from '../hooks/usePortfolio';
import ThemeWrapper from '../componenets/ThemeWrapper';
import Navbar from '../componenets/Navbar';
import Footer from '../componenets/Footer';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { data: portfolio } = usePortfolio();
  const { data: post, isLoading, isError } = useBlogPost(slug);

  if (!portfolio?.profile) return null;

  const { profile } = portfolio;

  return (
    <ThemeWrapper themeName={profile.theme}>
      <Navbar profile={profile} theme={{}} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {isLoading && <p>Loading post...</p>}
        {isError && <p className="text-red-500">Post not found.</p>}
        {post && (
          <>
            <Link to="/blog" className="text-indigo-600 hover:underline mb-4 inline-block">&larr; Back to Blog</Link>
            <h1 className="text-3xl font-bold mt-2">{post.title}</h1>
            <time className="text-sm text-gray-500 block mt-2 mb-8">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </time>
            <article className="prose max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
          </>
        )}
      </main>
      <Footer profile={profile} theme={{}} />
    </ThemeWrapper>
  );
};

export default BlogPostPage;