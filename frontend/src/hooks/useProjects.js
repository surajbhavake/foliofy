import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

export const useProject = () =>{
    return useQuery({
        queryKey : ['projects'],
        queryFn : async()=>{
            const {data} = await api.get('/projects/');
            return data;
        }
    })
}


export const useCreateProject = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (formData) => api.post('/projects/',formData,{
            headers : {
                'Content-Type': 'multipart/form-data'
            },
        }),
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey : ['projects']
            })
        }
    })
}


export const useUpdateProject = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn :(formData) =>{
            const {id,...payload} = formData;
            return api.patch(`/project/${id}/`,payload,{
                headers : {
                    'Content-Type' : 'multipart/form-data'
                },
            })
        },
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey : ['projects']
            })
        }

    })
}

export const useDeleteProject = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (id) => api.delete(`/projects/${id}/`),
        onSuccess : () => queryClient.invalidateQueries({queryKey:['projects']})
    })
}