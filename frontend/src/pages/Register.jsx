import { useState } from "react";
import axios from "axios";
import { Notify } from "notiflix";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.target);
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const password = formData.get("password");
      console.log(email, password);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      console.log(response);
      if (response.status === 201) {
        Notify.success("Registration successful");
      } else if (response.status === 400) {
        throw new Response(JSON.stringify(response.data), { status: 400 });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>
        <form
          onSubmit={handleRegister}
          method="post"
          className="flex flex-col gap-6"
        >
          {/* First Name and Last Name */}
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium">First Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium">Last Name:</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Email and Password */}
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Registered already?{" "}
            <Link className="text-blue-600 hover:underline" to="/">
              Click here to login!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
