import { createHashRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

import { Login } from "./pages/auth/Login";
import { Registration } from "./pages/auth/Registration";
// import { Registration } from "./pages/auth/Registration";

const MainLayouts = lazy(() => import("./layouts/MainLayouts").then((m) => ({ default: m.MainLayouts })));
const MessengerPage = lazy(() => import("./pages/MessengerPage").then((m) => ({ default: m.MessengerPage })));

export const router = createHashRouter([
  {
    path: "/",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <MainLayouts />,
        children: [
          {
            path: "chat/:id", 
            element: <MessengerPage />,
          },
        ],
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
]);
