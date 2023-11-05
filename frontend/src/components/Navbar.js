import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
import logo from "../logo512.png";
 

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const navigate = useNavigate(); 
  
  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src={logo} alt="Logo" style={{ width: '100px', height: '100px', marginRight: '10px' }} />
        <h1 style={{ margin: 0 }}>Application Tracker</h1>
      </Link>
        
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar