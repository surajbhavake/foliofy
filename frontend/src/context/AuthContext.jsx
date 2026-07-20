import { createContext,useContext,useState,useEffect, Children } from "react";
import api from '../api/axios';

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
         console.log("1. login() started");

  try {
    console.log("2. About to call API");

    const { data } = await api.post("/token/", {
      username,
      password,
    });

    console.log("3. API Success", data);

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    console.log("4. Tokens stored");

    const profileRes = await api.get("/profiles/");

    console.log("5. Profile", profileRes.data);

    setUser(profileRes.data[0] || null);

  } catch (error) {
    console.log("LOGIN ERROR");
    console.log(error);
    console.log(error.response);
    throw error;
  }

    };

    const logout = () =>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null)
    };


    const register = async (userData) =>{
        const { data } = await api.post('/register/', userData);
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        // Use the user data from the response directly
        setUser(data.user);
    }

    return(
        <AuthContext.Provider value={{user,login,register,logout,loading}}>{children}</AuthContext.Provider>
    )
}