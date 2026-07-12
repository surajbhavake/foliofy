import {useQuery} from '@tanstack/react-query'
import api from '../api/axiox'

export const usePortfolio = () =>{
    return useQuery({
        queryKey : ['portfolio'],
        queryFn : async()=>{
            const {data} = await api.get('/portfolio/');
            return data
        },
        retry : false,
    })
}