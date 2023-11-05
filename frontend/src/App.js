import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Stats from './pages/Stats'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'

function App() {
  const { user } = useAuthContext()
 

  return (
    <div className="App">
      <BrowserRouter>
     
        <Navbar/> 
        <div className="pages">
          <Routes>
             
          <Route 
              path="/"
              element={ user ? <Home /> : <Navigate to='/login' />}
            />
            <Route 
              path="/login" 
              element={ !user ? <Login /> : <Navigate to='/' />}
            />
            <Route 
              path="/signup" 
              element={ !user ? <Signup /> : <Navigate to='/login' />}
            />
            <Route 
              path="/stats" 
              element={ user ? <Stats /> : <Navigate to='/login' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;