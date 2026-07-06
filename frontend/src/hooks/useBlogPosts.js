import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export const useBlogPosts = () =>{
    return useQuery({
        queryKey : ['blogposts'],
        queryFn : async()=>{
            const {data} = await api.get('/blogposts/');
            return data;
        }
    })
}

export const useCreateBlogPost = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (newPost)=> api.post('/blogposts/',newPost),
        onSuccess : () => queryClient.invalidateQueries({queryKey:['blogposts']})
    })
}

export const useUpdateBlogPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(updatedBlogPost)=>{
            const {id,...payload} = updatedBlogPost;
            return api.patch(`/blogposts/${id}/`,payload)
        },
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['blogposts']})
    })
}

export const useDeleteBlogPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(id)=>api.delete(`/blogposts/${id}/`),
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['blogposts']})
    })
}