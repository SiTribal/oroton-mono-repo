import { createContext } from "react";
import {UserType} from  '../types'

const UserContext = createContext<UserType>({} as UserType)
export default UserContext;