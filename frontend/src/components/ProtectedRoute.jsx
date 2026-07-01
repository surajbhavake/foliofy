import {Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({children})=>{
    const {user,loading} = useAuth();

    if(loading) return <div>Loading....</div>
    if(!user) return <Navigate to='/login' replace></Navigate>

    return children
}

export default ProtectedRoute;



// A Protected Route is a wrapper component that checks whether a user is authenticated before
//  rendering a page. If the authentication state is still being determined, it can display a
//  loading state. If the user is not authenticated, it redirects them to the login page. 
// If the user is authenticated, it renders the protected component passed as its children.