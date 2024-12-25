import axios from "axios";
import { Outlet, useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { Notify } from "notiflix";

const UsersDashboard = () => {
  const loaderSeminars = useLoaderData();
  const [seminars, setSeminars] = useState(loaderSeminars);

  const handleBooking = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://dict-project.onrender.com/api/bookings`,
        {
          seminarId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 400) {
        throw new Response(JSON.stringify(response.data), { status: 400 });
      }

      // Update slots available locally
      setSeminars((prevSeminars) =>
        prevSeminars.map((seminar) =>
          seminar._id === id
            ? { ...seminar, slotsAvailable: seminar.slotsAvailable - 1 }
            : seminar
        )
      );

      Notify.success("Booking successful!");
      return response.data;
    } catch (error) {
      console.error(error);
      Notify.failure("Failed to book the seminar. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-6">Available Seminars</h1>
      <div className="w-full max-w-5xl">
        {seminars.map((seminar) => (
          <div
            key={seminar._id}
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
                  <span className="font-bold">Speaker:</span>{" "}
                  {seminar.speaker.name}
                </p>
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
                  <span className="font-bold">Slots Available:</span>{" "}
                  {seminar.slotsAvailable}
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
              <a
                href={seminar.speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                LinkedIn Profile
              </a>
            </div>

            {/* Booking Button */}
            <button
              onClick={() => handleBooking(seminar._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 self-center md:self-start"
              disabled={seminar.slotsAvailable === 0}
            >
              {seminar.slotsAvailable === 0 ? "Fully Booked" : "Book Now"}
            </button>
          </div>
        ))}
      </div>
      <Link
        to="bookedSeminars"
        className="inline-block text-center bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        View all your Booked Seminars
      </Link>
      <Outlet />
    </div>
  );
};

export default UsersDashboard;

export const loader = async () => {
  const response = await axios.get(
    "https://dict-project.onrender.com/api/seminars"
  );
  return response.data;
};
