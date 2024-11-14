import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/Auth/LoginPage/LoginPage.tsx";
import { HomePage } from "./pages/Home/HomePage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <LoginPage />,
  },
]);
