import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export const useSkill = () =>{
    return useQuery({
        queryKey : ['skills'],
        queryFn : async() =>{
            const {data} = await api.get('/skills/');
            return data;
        }
    })
}

export const useCreateSkill = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (newSkill) => api.post('/skills/',newSkill),
        onSuccess : () => {queryClient.invalidateQueries({queryKey : ['skills']})}
    })
}

export const useUpdateSkill = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (updatedSkills) => {
            const {id,...payload} = updatedSkills;
            return api.patch(`/skills/${id}/`,payload)
        },
        onSuccess : ()=>queryClient.invalidateQueries({queryKey:['skills']})
    })
}

export const useDeleteSkill = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(id)=> api.delete(`/skills/${id}/`),
        onSuccess : ()=>queryClient.invalidateQueries({queryKey:['skills']})
    })
}