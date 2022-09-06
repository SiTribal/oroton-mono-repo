import { Routes, Route } from 'react-router-dom'
import * as pages from './pages'
import * as components from './components'
import * as providers from './providers'
import  {ProtectedRoutes}  from './components/Auth'

const { GameSetupProvider, UserProvider } = providers
const { Home, Login, Game, PreviousGames, GameLog, Register } = pages
const { Header, HeaderActions } = components

function App () {
  return (
    <>
      <GameSetupProvider>
        <UserProvider>
          <Header>
            <HeaderActions />
          </Header>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path = 'game' element={<Game />}/>
              <Route path='game-log/:id' element={<GameLog />}/>
              <Route path='games' element={<PreviousGames />}/>
            </Route>
            <Route path='/' element={<Home />}/>
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register />} />
          </Routes>
        </UserProvider>
      </GameSetupProvider>
    </>
  )
}

export default App
