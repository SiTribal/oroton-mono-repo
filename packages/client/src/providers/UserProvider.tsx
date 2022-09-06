import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks";
import UserContext from "../context/UserContext";
import {UserType} from '../types'
import { verifyAuth } from '../utils/http'

interface iProps {
    children: React.ReactNode
}

const UserProvider: React.FC<iProps> = 
({children}: iProps) => {
    const [user] = useLocalStorage<any>('user', [])
    const [loggedIn, setLoggedIn] = useState<boolean | undefined>(user.user !== undefined)
    const setLoggedInCB = (loggedIn?: boolean) => {
        setLoggedIn(loggedIn)
    }
    
    const userVal: UserType = {
        loggedIn,
        setLoggedInCB,
    }

    useEffect(() => {
            if(user !== undefined){
                if(user.length > 0){
                const token = user.user.token
                verifyAuth(token, 'api/auth/verify')
                .then((res) => console.log(res))
                    setLoggedIn(true)
                }
            }
    },[user])

    return(
        <UserContext.Provider value={userVal}>
            {children}
        </UserContext.Provider>
    )
}  

export default UserProvider