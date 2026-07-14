import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-gray-500 mt-4">Page not found.</p>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;