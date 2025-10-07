import { useState, useContext } from "react";
import { login as loginUser, register as registerUser } from "../api/auth.jsx";
import AuthContext from "../context/authcontext.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/loginregister.css"; 


const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
//   const [setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // from context

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Split into two handlers
const handleLoginSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser({ email: formData.email, password: formData.password });
    const token = res.data.token;
    login(res.data.user, token);
    alert("Login successful!");
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.msg || "Login failed");
  }
};

const handleRegisterSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await registerUser(formData);
    const token = res.data.token;
    
    alert("Registration successful!"); // ✅ Added success alert
    
    login(res.data.user, token);
  } catch (err) {
    alert(err.response?.data?.msg || "Registration failed");
  }
};

  return (
    <div className="login-register-page">
  <div className={`container ${isLogin ? "" : "active"}`}>
    <div className="form-box login">
      <form onSubmit={handleLoginSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>

    <div className="form-box register">
      <form onSubmit={handleRegisterSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-envelope"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="provider">Provider</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>

    <div className="toggle-box">
        <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => setIsLogin(false)}>Register</button>
        </div>
        <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => setIsLogin(true)}>Login</button>
        </div>

    </div>
  </div>
  </div>
);
};

export default LoginRegister;
