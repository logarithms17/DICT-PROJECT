import axios from "axios";
import { useLoaderData } from "react-router-dom";

const BookedSeminars = () => {
  const bookedSeminars = useLoaderData();

  return (
    <div className="flex flex-col items-center min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-6">Your Booked Seminars</h1>
      <div className="w-full max-w-5xl">
        {bookedSeminars.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not booked any seminars yet.
          </p>
        ) : (
          bookedSeminars.map(({ _id, seminar, paymentStatus }) => (
            <div
              key={_id}
              className="bg-white shadow-md rounded-lg mb-6 p-6 flex flex-col md:flex-row gap-4"
            >
              {/* Seminar Details */}
              <div className="flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-blue-600">
                  {seminar.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(seminar.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-700 mb-4">{seminar.description}</p>
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-bold">Venue:</span> {seminar.venue}
                  </p>
                  <p>
                    <span className="font-bold">Time:</span>{" "}
                    {seminar.timeFrame.from} - {seminar.timeFrame.to}
                  </p>
                  <p>
                    <span className="font-bold">Fee:</span> ${seminar.fee}
                  </p>
                  <p>
                    <span className="font-bold">Payment Status:</span>{" "}
                    {paymentStatus}
                  </p>
                </div>
              </div>

              {/* Speaker Info */}
              <div className="flex flex-col items-center">
                <img
                  src={seminar.speaker.image}
                  alt={seminar.speaker.name}
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
                <p className="text-sm font-bold">{seminar.speaker.name}</p>
                <a
                  href={seminar.speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookedSeminars;

export const loader = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "https://dict-project.onrender.com/api/bookings",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response);

  if (response.status === 400) {
    throw new Response(JSON.stringify(response.data), { status: 400 });
  }

  return response.data;
};
