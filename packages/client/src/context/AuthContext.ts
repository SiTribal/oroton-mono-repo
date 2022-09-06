import { create } from "domain";
import { createContext } from "react";

type AuthContextType = {
    login: (username: string, password: string) => Promise<true | string>
    register: (username: string, password: string) => Promise <true | string>
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export default AuthContext