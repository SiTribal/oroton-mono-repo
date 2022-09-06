import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context'


export const ProtectedRoutes: React.FC =() => {

const {loggedIn} = useContext(UserContext)

    return loggedIn ? <Outlet/> : <Navigate to='/login' />
}