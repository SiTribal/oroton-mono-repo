import React from 'react'
import { useState, useEffect,  } from "react";
import { useLocalStorage } from "../hooks";
import { post, setToken } from '../utils/http'
import AuthContext from '../context/AuthContext'

type Props = {
    children: React.ReactNode
}

type Credential = {
    username: string
    password: string
  }

export default function AuthProvider({children}: Props) {
  
    
    const register = async(username: string, password: string) => {
        const user = await post<Credential, any>('/api/auth/register', {
            username,
            password,
          })
          return user
    }
    

    const login = async(username: string, password: string) => {
        try {
            const user = await post<Credential, any>('/api/auth/login', {
              username,
              password,
            })
            return user
        } catch (error) {
        if (error instanceof Error) {
          return error.message
        }
    }
    }

    
    
    const logout = () => {
        
      }

  return (
    <AuthContext.Provider value={{ register, login, logout }}>  {children}
    </AuthContext.Provider>
  )
}