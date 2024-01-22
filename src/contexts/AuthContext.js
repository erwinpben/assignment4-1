import React, {useContext, useState, useEffect} from "react";
import {auth, generateUserDocument} from '../firebase';



export const AuthContext = React.createContext()


export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}