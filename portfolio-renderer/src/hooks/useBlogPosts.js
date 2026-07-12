import { useQuery } from "@tanstack/react-query";
import api from "../api/axiox";

export const useBlogPosts = () => {
    return useQuery({
        queryKey : ['blogPosts'],
        queryFn : async()=>{
            const {data} = await api.get('/blog/');
            return data;
        }
    })
}

export const useBlogPost = (slug) =>{
    return useQuery({
        queryKey : ['blogPost', slug],
        queryFn : async() =>{
            const {data} = await api.get(`/blog/${slug}/`);
            return data;
        },
        enabled : !!slug,

    })
}