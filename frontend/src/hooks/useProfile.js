import {useQuery,useMutation, useQueryClient} from '@tanstack/react-query'
import api from '../api/axios'

export const useProfile = () =>{
    return useQuery({
        queryKey : ['profile'],
        queryFn : async()=>{
            const {data} = await api.get('/profiles/');
            return data.length ? data[0] : null 
        },
    })
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (updatedProfile) =>{
            const {id , ...payload} = updatedProfile;
            return api.patch(`/profiles/${id}/`,payload)
        },
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey : ['profile']
            })
        }
    })
}


export const useCreateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(newProfile)=>api.post('/profiles/',newProfile),
        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : ['profile']
            })
        },
    })
}