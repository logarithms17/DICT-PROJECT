import { useNavigate } from "react-router-dom";

const ConfirmPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-center mt-6 mb-4">
        You have successfully created a seminar!
      </h1>

      <button onClick={() => navigate("/dashboard")}>View all seminars</button>
    </div>
  );
};

export default ConfirmPage;
