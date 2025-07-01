import { FaUserCircle } from "react-icons/fa";
import { UseAuthContext } from "../context/AuthProvider";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { login_Img } from "../utils/imageData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// 🧾 Available Roles
const roles = [
  { name: "User", isoCode: "user" },
  { name: "Admin", isoCode: "admin" },
];

const SignUp = () => {
  // 🧠 Context-based auth state and methods
  const {
    isAuth,
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
    loading,
  } = UseAuthContext() || {};

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])


  // 🔁 Update form values based on field name
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4">
      {/* 🎨 Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={login_Img}
          alt="Background"
          className="w-full h-full object-cover brightness-75 blur-[1px]"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 🔐 Login/Register Box */}
      <div className="w-full max-w-md text-white rounded-xl shadow-xl p-6 space-y-5 bg-gradient-to-br from-purple-800/60 to-blue-900/60 backdrop-blur-sm">
        {/* 👤 User Icon */}
        <div className="flex justify-center text-gray-300 text-6xl">
          <FaUserCircle />
        </div>

        {/* 🔄 Login/Register Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-red-500 to-green-400 bg-clip-text text-transparent">
          {isLogin ? "Login to Eshop" : "Register for EShop"}
        </h2>

        {/* 📋 Form Fields */}
        <div className="space-y-4">
          {/* 👤 Full Name (Only in Register Mode) */}
          {!isLogin && (
            <InputField
              name="fullName"
              label="Full Name"
              value={name}
              onChange={handleChange}
              autoFocus
              bgColor="bg-transparent"
              textColor="text-white"
              ringColor="ring-orange-400"
            />
          )}

          {/* 📧 Email Field */}
          <InputField
            name="email"
            label="Email"
            value={email}
            onChange={handleChange}
            type="email"
            bgColor="bg-transparent"
            textColor="text-white"
            ringColor="ring-orange-400"
          />

          {/* 🔐 Password Field */}
          <InputField
            name="password"
            label="Password"
            value={password}
            onChange={handleChange}
            type="password"
            bgColor="bg-transparent"
            textColor="text-white"
            ringColor="ring-orange-400"
          />

          {/* 🧾 Role Selector (Dropdown) */}
          <SelectField
            label="Role"
            name="role"
            value={role}
            onChange={handleChange}
            options={roles.map((r) => ({
              label: r.name,
              value: r.isoCode,
            }))}
            bgColor="bg-white/80"
            textColor="text-gray-900"
            ringColor="focus:ring-orange-400"
          />

          {/* 🔘 Submit Button */}
          <button
            disabled={loading}
            onClick={isLogin ? handleLogin : handleRegister}
            className={`w-full mt-3 py-2 rounded-lg text-white font-semibold transition duration-200 ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90"
              }`}
          >
            {loading
              ? "Processing..."
              : isLogin
                ? "Sign In"
                : "Sign Up"}
          </button>
        </div>

        {/* 🔁 Switch between Login/Register */}
        <p className="text-center text-sm">
          {isLogin ? "I don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-orange-400 underline ml-2 cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
