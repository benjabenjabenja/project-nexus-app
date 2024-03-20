/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RouteProtected({ children }) {
    
    const { auth } = useAuth();
    return (
        <>
            {
                auth ? <div>{children}</div> : <Navigate to="/" />
            }
        </>
    );
}

export default RouteProtected;
