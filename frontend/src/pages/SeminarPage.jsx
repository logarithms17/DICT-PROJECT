import React from "react";
import { Form, redirect } from "react-router-dom";
import axios from "axios";

const SeminarPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create a Seminar
      </h1>
      <Form method="post" className="space-y-6">
        {/* Title */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            placeholder="Enter description..."
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Date</label>
          <input
            type="date"
            name="date"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time Frame */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Time Frame</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Start Time</label>
              <input
                type="time"
                name="timeFrame.from"
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">End Time</label>
              <input
                type="time"
                name="timeFrame.to"
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Venue</label>
          <input
            type="text"
            name="venue"
            placeholder="Enter venue"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Speaker */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Speaker</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="speaker.name"
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Image</label>
              <input
                type="file"
                name="speaker.image"
                accept="image/*"
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">LinkedIn</label>
              <input
                type="text"
                name="speaker.linkedin"
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Fee */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Fee</label>
          <input
            type="number"
            name="fee"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Available Slots */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Available Slots</label>
          <input
            type="number"
            name="slotsAvailable"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Seminar
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SeminarPage;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const formatDate = (date) => new Date(date).toISOString().split("T")[0];
  data.date = formatDate(data.date);

  console.log("Formatted Data:", data);

  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/seminars",
    data,
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

  return redirect("/confirm");
};
