import { useLoaderData } from "react-router-dom";
import SeminarsList from "../components/SeminarsList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Notify } from "notiflix";

const Dashboard = () => {
  const navigate = useNavigate();
  const seminars = useLoaderData();
  console.log(seminars);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.auth.notification);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log(notification);
      if (notification === null) return;
      Notify.failure("You are not logged in");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col gap-10 mt-10">
      <button onClick={() => navigate("/createSeminar")} className="">
        Create a seminar
      </button>
      <SeminarsList seminars={seminars} />
    </div>
  );
};

export default Dashboard;

export const loader = async () => {
  const response = await axios.get(
    "https://dict-project.onrender.com/api/seminars"
  );
  console.log(response);

  if (response.status === 400) {
    throw new Response(JSON.stringify(response.data), { status: 400 });
  }

  return response.data;
};
