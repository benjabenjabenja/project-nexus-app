/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, createContext, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")) || {});
    
    useEffect(
        () => {
            const authUser = async () => { 
                const user = JSON.parse(localStorage.getItem("user")) || {};
                if (!user) {
                    return;
                }
                setAuth({ user });
            }
            authUser();
        }, []
    );

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >{children}</AuthContext.Provider>
    )
}
export { AuthProvider };
    
export default AuthContext;