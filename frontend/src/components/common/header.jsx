import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authcontext.jsx";
import "../../styles/header.css";





const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/" className="menu">Home</Link></li>
          <li><Link to="/search" className="menu">Services</Link></li>

          {user ? (
            <>
              {user.role === "user" && (
                <>
                  <li><Link to="/profile" className="menu">Profile</Link></li>
                  <li><Link to="/history" className="menu">History</Link></li>
                  
                </>
              )}

              {user.role === "provider" && (
                <>
                  <li><Link to="/register-provider" className="menu">Become a Provider</Link></li>
                  <li><Link to="/provider/dashboard" className="menu">Provider Dashboard</Link></li>
                  <li><Link to="/history" className="menu">History</Link></li>
                </>
              )}

              {user.role === "admin" && (
                <>
                  <li><Link to="/admin/dashboard" className="menu">Admin Dashboard</Link></li>
                </>
              )}

              <li>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/auth" className="login-btn">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
