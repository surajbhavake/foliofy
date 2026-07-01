import { createContext,useContext,useState,useEffect, Children } from "react";
import axios from "axios";

const AuthContext = createContext() //this is just a global storage that we have created 

export const useAuth = () => useContext(AuthContext) // by using useAuth we are access that storage

export const AuthProvider = ({children}) =>{
    
    const[user,setUser] = useState(null);
    const[loading,setloading] = useState(true);

    useEffect(()=>{
        
        const token = localStorage.getItem('access_token')

        if(token){

            api.get('/profiles/')
            .then((res)=>{
                setUser(res.data[0] || null)
            })
            .catch(()=>{
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                setUser(null)
            })
            .finally(()=>setloading(false)) 
        } else {
            setloading(false)
        }

    },[])


    const login = async (username,password) => {
        const {data} = api.post('/token/',{username,password})
        localStorage.setItem('access_token',data.access),
        localStorage.setItem('refresh_token',data.refresh)

        const profileRes = await api.get('/profiles/');
        setUser(profileRes.data[0] || null )

    };

    const logout = () =>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null)
    };


    return(
        <AuthContext.Provider value={{user,login,logout,loading}}>{children}</AuthContext.Provider>
    )
}