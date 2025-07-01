import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../App";

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
  const BASE_URL = `${API_URL}/api`;
  // axios.defaults.withCredentials = true;



  const getUser = async () => {

    try {
      setLoading(true);
      const {data} = await axios.get(`${"http://localhost:8080"}/api/user/me`,{
        withCredentials:true
      })
     
      setUser(data.user || null);
      setIsAuth(data.success || false);
    } catch (err) {
      console.log("Error is : ", err)
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Auto-login agar cookie present hai


  // 🔐 Login ka handler
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          email,
          password,
          role,
        },
        {
          withCredentials: true, // ✅ Add this to send/receive cookie
        }
      );

    

      if (data.success) {
        console.log(data)
        setUser(data.user);
        setIsAuth(data.success);
        toast.success("Login successful");
        await getUser(); // ✅ This should also use withCredentials
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
      },
        {
          withCredentials: true, // ✅ Add this to send/receive cookie
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
        getUser
      }}
    >
      {children}
    </Context.Provider>
  );
};

// 🔗 Custom hook for easy context usage
export const UseAuthContext = () => useContext(Context);

export default AuthProvider;
