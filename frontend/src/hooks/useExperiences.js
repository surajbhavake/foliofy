import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import api from '../api/axios'

export const useExperiences = () => {
    return useQuery({
        queryKey : ['experiences'],
        queryFn : async ()=>{
            const {data} = await api.get('/experiences');
            return data;
        }
    })
}

export const useCreateExperience = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (newExp) => api.post('/experiences/',newExp),
        onSuccess : ()=> queryClient.invalidateQueries({queryKey:['experiences']})
    })
}

export const useUpdateExperienc = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({id,...data})=> api.patch(`/experiences/${id}/`,data),
        onSuccess : ()=> queryClient.invalidateQueries({queryKey:['experiences']})
    })
}

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/experiences/${id}/`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['experiences'] }),
  });
};