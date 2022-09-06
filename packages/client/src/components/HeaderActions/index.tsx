import React, {useContext} from 'react'
import { UserContext } from '../../context'
import s from './HeaderActions.module.css'
import { useNavigate, useLocation } from 'react-router-dom'


const HeaderActions: React.FC = () => {

  const {loggedIn} = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const logout = () => {
    window.localStorage.clear();
    window.location.reload()
  }
  return (
    <div className={s.actions}>
      {
        loggedIn || location.pathname.split('/')[1] === 'login' ? 
        <></>
        :
        <>
          <button onClick={() => navigate('/login')} className={s.action}>Login</button>  <button onClick={() => navigate('/Register')} className={s.action}>Register</button>         
        </>
      }
      {
        loggedIn && location.pathname.split('/')[1] === '' ? <><button onClick ={() => logout()} className={s.action}>Logout</button> <button onClick = {() => navigate('/games')} className={s.action}>Previous Games</button></>
        :
        <></>
      }
      
    </div>
  )
}

export default HeaderActions
