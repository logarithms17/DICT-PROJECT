import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.log(error);
  console.log(error.status);

  let message = "Something went wrong.";
  let title = "Error";

  if (error.status === 400) {
    title = error.message;
    message = error.response.data.error;
  } else if (error.status === 500) {
    title = error.message;
    message = "Something went wrong on the server.";
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-red-500">{message}</p>
      <button
        className="mt-4 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("..")}
      >
        Go back
      </button>
    </div>
  );
};

export default ErrorPage;
