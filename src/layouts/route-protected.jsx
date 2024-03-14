/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

function RouteProtected({ children }) {
    
    const { auth } = useAuth(); 

    useEffect(
        () => {
            console.log({auth})
        },[auth]
    )
    return (
        <>
            {
                auth ? <div>{children}</div> : <Navigate to="/" />
            }
        </>
    );
}

export default RouteProtected;
