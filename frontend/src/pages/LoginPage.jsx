import axios from "axios";
import { redirect, Form, Link } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminAuthPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.auth.notification);
  const { type, message } = notification || {};

  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoggedIn);

  useEffect(() => {
    const role = localStorage.getItem("role");
    console.log(role);
    if (isLoggedIn && role === "admin") {
      navigate("/dashboard");
    } else if (isLoggedIn && role === "user") {
      navigate("/userDashboard");
    }
  }, [isLoggedIn]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
    try {
      const response = await axios.post(
        "https://dict-project.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", response.data.user.role);
      dispatch(login(token));
      Notify.success("Login successful");
      if (response.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/userDashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>
        <form
          onSubmit={handleLogin}
          method="post"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Not yet registered?{" "}
            <Link className="text-blue-600 hover:underline" to="/register">
              Click here!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthPage;
