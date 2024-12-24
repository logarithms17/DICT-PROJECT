import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Notify } from "notiflix";
import { redirect } from "react-router-dom";
export const action = async ({ request }) => {
    const formData = await request.formData();
    const dispatch = useDispatch();

  console.log(formData);

  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);

    
  const response = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });

  const token = response.data.token;

  localStorage.setItem("token", token);

    console.log(response);
    
    if (response.status === 200) {
        dispatch(login());
        Notify.success("Login successful");
        return redirect("/dashboard");
    }
  if (response.status === 400) {
    throw new Response(JSON.stringify(response.data), { status: 400 });
  }
};