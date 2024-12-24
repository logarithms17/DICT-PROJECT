import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";

const SeminarsList = ({ seminars }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await deleteSeminarAction(id);

      if (response.status === 400) {
        throw new Response(JSON.stringify(response.data), { status: 400 });
      }

      console.log(response);

      Notify.success("Seminar deleted successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    console.log(id);
    navigate(`${id}`);
  };
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Seminars List
      </h1>
      <ul className="space-y-6">
        {seminars.map((seminar) => (
          <li
            key={seminar._id}
            className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white"
          >
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">
                Title: <span className="font-normal">{seminar.title}</span>
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Description:{" "}
                <span className="font-normal">{seminar.description}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">
                Date:{" "}
                <span className="font-normal">
                  {new Date(seminar.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
              <p className="text-lg font-semibold text-gray-700">
                From:{" "}
                <span className="font-normal">{seminar.timeFrame.from}</span>
              </p>
              <p className="text-lg font-semibold text-gray-700">
                To: <span className="font-normal">{seminar.timeFrame.to}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">
                Venue: <span className="font-normal">{seminar.venue}</span>
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Speaker:</h2>
              <p className="text-lg font-semibold text-gray-700">
                Name:{" "}
                <span className="font-normal">{seminar.speaker.name}</span>
              </p>
              {/* Uncomment when image handling is required */}
              {/* <p className="mt-2">
                <img
                  src={`${seminar.speaker.image}`}
                  className="w-20 h-20 object-cover rounded-full border"
                  alt="Speaker"
                />
              </p> */}
              <p className="text-lg font-semibold text-gray-700">
                LinkedIn:{" "}
                <a
                  href={seminar.speaker.linkedin}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {seminar.speaker.linkedin}
                </a>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">
                Fee: <span className="font-normal">{seminar.fee}</span>
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Available Slots:{" "}
                <span className="font-normal">{seminar.slotsAvailable}</span>
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
                onClick={() => handleUpdate(seminar._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                onClick={() => handleDelete(seminar._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeminarsList;

// delete seminar
export const deleteSeminarAction = async (seminarId) => {
  const token = localStorage.getItem("token");

  console.log(seminarId);

  const response = await axios.delete(
    `http://localhost:5000/api/seminars/${seminarId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 400) {
    throw new Response(JSON.stringify(response.data), { status: 400 });
  }

  return response.data;
};
