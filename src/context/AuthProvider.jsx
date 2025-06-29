import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// 🎯 Auth Context banaya gaya hai
const Context = createContext();

// 🧠 Global Auth Provider component
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // 🔐 User-related state
  const [user, setUser] = useState(null);         // User data
  const [isAuth, setIsAuth] = useState(false);    // Auth status
  const [loading, setLoading] = useState(true);   // Global loader

  // 📥 Input field state
  const [isLogin, setIsLogin] = useState(true);   // Login/Register toggle
  const [name, setName] = useState("");           // Full name
  const [email, setEmail] = useState("");         // Email
  const [password, setPassword] = useState("");   // Password
  const [role, setRole] = useState("");           // Role (User/Admin)

  // 🌍 API base config
  const BASE_URL = "http://localhost:8080/api";
  axios.defaults.withCredentials = true;

  // ✅ User data laane wala function
  const getUser = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/me`);
      if (data.success) {
        setUser(data.user);
        setIsAuth(true);
        localStorage.removeItem("logout");
      } else {
        setUser(null);
        setIsAuth(false);
      }
    } catch (error) {
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Auto-login agar cookie present hai
  useEffect(() => {
    const loggedOut = localStorage.getItem("logout");
    if (loggedOut) {
      setUser(null);
      setIsAuth(false);
      setLoading(false);
    } else {
      getUser(); // sirf ek baar call
    }
  }, []); // Dependency khali rakhna important hai

  // 🔐 Login ka handler
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
        role,
      });

      if (data.success) {
        toast.success("Login successful");
        localStorage.removeItem("logout");
        await getUser();
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  // 📝 Registration ka handler
  const handleRegister = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
        role,
      });

      if (data.success) {
        toast.success("Registration successful");
        localStorage.removeItem("logout");
        await getUser();
        navigate("/");

        // 🧹 Form ko reset karo
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Register error");
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout ka handler
  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/logout`);

      if (data.success) {
        setUser(null);
        setIsAuth(false);
        localStorage.setItem("logout", "true"); // logout flag
        toast.success(data.message || "Logged out successfully");
        navigate("/");
        window.location.reload(); // UI ko fully reset kare
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || "Logout error");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Global context value provide karo
  return (
    <Context.Provider
      value={{
        user,
        isAuth,
        loading,
        isLogin,
        setIsLogin,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// 🔗 Custom hook for easy context usage
export const UseAuthContext = () => useContext(Context);

export default AuthProvider;
