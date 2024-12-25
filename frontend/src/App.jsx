import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminAuthPage from "./pages/LoginPage";
import SharedLayout from "./pages/SharedLayout";
import ErrorPage from "./pages/ErrorPage";
import SeminarPage, { action as seminarAction } from "./pages/SeminarPage";
import ConfirmPage from "./pages/ConfirmPage";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import { deleteSeminarAction } from "./components/SeminarsList";
import UpdateSeminarPage, {
  loader as updateSeminarLoader,
  action as updateSeminarAction,
} from "./pages/UpdateSeminarPage";
import Register from "./pages/Register";
import UsersDashboard, {
  loader as usersDashboardLoader,
} from "./components/UsersDashboard";

import BookedSeminars, {
  loader as bookedSeminarsLoader,
} from "./components/BookedSeminars";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminAuthPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: deleteSeminarAction,
      },
      {
        path: "dashboard/:id",
        element: <UpdateSeminarPage />,
        loader: updateSeminarLoader,
        action: updateSeminarAction,
      },
      {
        path: "userDashboard",
        element: <UsersDashboard />,
        loader: usersDashboardLoader,
        children: [
          {
            path: "bookedSeminars",
            element: <BookedSeminars />,
            loader: bookedSeminarsLoader,
          },
        ],
      },
      {
        path: "createSeminar",
        element: <SeminarPage />,
        action: seminarAction,
      },
      {
        path: "confirm",
        element: <ConfirmPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
