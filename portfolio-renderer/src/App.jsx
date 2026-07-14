import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime:5*60*1000,
        },
    },
});


function App(){
    return(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <Routes>
                <Route path='/' element = {<HomePage/>}/>
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}


export default App;