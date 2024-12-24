import { useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import axios from "axios";

const UpdateSeminarPage = () => {
  const data = useLoaderData();
  console.log(data);

  const date = new Date(data.date);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const [seminarData, setSeminarData] = useState({
    title: data.title || "",
    description: data.description || "",
    date: formattedDate || "",
    timeFrame: {
      from: data.timeFrame?.from || "",
      to: data.timeFrame?.to || "",
    },
    venue: data.venue || "",
    speaker: {
      name: data.speaker?.name || "",
      image: null, // For image input
      linkedin: data.speaker?.linkedin || "",
    },
    fee: data.fee || "",
    slotsAvailable: data.slotsAvailable || "",
  });

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-lg rounded-xl">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
        Update Seminar
      </h1>
      <Form method="post" className="space-y-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            value={seminarData.title}
            onChange={(e) =>
              setSeminarData({ ...seminarData, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Enter description..."
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            value={seminarData.description}
            onChange={(e) =>
              setSeminarData({ ...seminarData, description: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            value={seminarData.date}
            onChange={(e) =>
              setSeminarData({ ...seminarData, date: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Start Time</label>
            <input
              type="time"
              name="timeFrame.from"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={seminarData.timeFrame.from}
              onChange={(e) =>
                setSeminarData({
                  ...seminarData,
                  timeFrame: { ...seminarData.timeFrame, from: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">End Time</label>
            <input
              type="time"
              name="timeFrame.to"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={seminarData.timeFrame.to}
              onChange={(e) =>
                setSeminarData({
                  ...seminarData,
                  timeFrame: { ...seminarData.timeFrame, to: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Venue</label>
          <input
            type="text"
            name="venue"
            placeholder="Enter venue"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            value={seminarData.venue}
            onChange={(e) =>
              setSeminarData({ ...seminarData, venue: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Speaker Name
            </label>
            <input
              type="text"
              name="speaker.name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={seminarData.speaker.name}
              onChange={(e) =>
                setSeminarData({
                  ...seminarData,
                  speaker: { ...seminarData.speaker, name: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Speaker LinkedIn
            </label>
            <input
              type="text"
              name="speaker.linkedin"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={seminarData.speaker.linkedin}
              onChange={(e) =>
                setSeminarData({
                  ...seminarData,
                  speaker: { ...seminarData.speaker, linkedin: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Fee</label>
            <input
              type="number"
              name="fee"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={seminarData.fee}
              onChange={(e) =>
                setSeminarData({ ...seminarData, fee: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Available Slots
            </label>
            <input
              type="number"
              name="slotsAvailable"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              value={seminarData.slotsAvailable}
              onChange={(e) =>
                setSeminarData({
                  ...seminarData,
                  slotsAvailable: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Seminar
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateSeminarPage;

export const loader = async ({ params }) => {
  console.log(params.id);
  const response = await axios.get(
    `http://localhost:5000/api/seminars/${params.id}`
  );
  console.log(response);

  if (response.status === 400) {
    throw new Response(JSON.stringify(response.data), { status: 400 });
  }

  return response.data;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const token = localStorage.getItem("token");
  const seminarId = params.id;

  const response = await axios.put(
    `http://localhost:5000/api/seminars/${seminarId}`,
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
  return redirect("/dashboard");
};
