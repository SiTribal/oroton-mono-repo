import React, {useState, useContext} from 'react'
import { UserContext} from '../../context'
import { useLocalStorage } from '../../hooks'
import s from './Form.module.css'
import { useNavigate } from 'react-router-dom'
import { post} from '../../utils/http'

interface Props{
  register: boolean
}

const Form: React.FC<Props> = ({register}: Props) => {

  const userContext = useContext(UserContext)
  const {setLoggedInCB} = userContext
    
    interface User{
        username: string,
        password?: string,
        token?: string
    }

    const user: User ={
        username: 'admin',
        password: 'admin'
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [userStore, saveUserStore] = useLocalStorage<Record<string, User>>('user', {})
    const navigate = useNavigate()

    const formHandler = (e: any) => {
        e.preventDefault()
        const FormUser: User = {
          username: username,
          password: password,
        } 
        if(register === true){
          post(
            '/api/auth/register', FormUser
          ).then((res: any) => {
            userContext.username = FormUser.username
            const UserStoreObject = {
              username: FormUser.username,
              token: res.accessToken as string
            }
            navigate('/')
            setLoggedInCB(true)
            saveUserStore({user: UserStoreObject})
          })
        }
        else{
          post(
            '/api/auth/login', FormUser
          ).then((res: any) => {
            userContext.username = FormUser.username
            const UserStoreObject = {
              username: FormUser.username,
              token: res.accessToken as string
            }
            navigate('/')
            setLoggedInCB(true)
            saveUserStore({user: UserStoreObject})
          }).catch((err) => {
            console.log(err)
          })


          if(JSON.stringify(user) === JSON.stringify(FormUser)){
            navigate('/')
            setLoggedInCB(true)
            saveUserStore({user: FormUser})
          }else{
            setError(true)
            setUsername('')
            setPassword('')
            setTimeout(() => {
              setError(false)
            }, 3000)
          }
        }
    } 

  return (
    <div className={s.container}>
      <form onSubmit={(e) => formHandler(e)}>
        <label>
            Username
        <input onChange={(e) => setUsername(e.target.value)} value={username} data-testid="username" placeholder={'username'} className={s.input} type='text'></input>
        </label>
        <label>
            Password
        <input data-testid="password" placeholder={'password'} value={password} onChange={(e) => setPassword(e.target.value)} className={s.input} type='password'></input>
        </label>
        <button className={s.button} type='submit'>{ 
        register ? <>Register</> : <>Login</>}</button>
        {error ? <h3 data-testid="error message">Error Incorrect username and or password</h3> : <></> }
      </form>
    </div>
  )
}

export default Form
