import { createBrowserRouter, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import App from "App";
import SignIn from "Pages/SignIn";
import SignUp from "Pages/SignUp";
import ToDo from "Pages/ToDo";
import Landing from "Components/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "signin",
        element: <ProtectedRoute element={<SignIn />} path="signin" />,
      },
      {
        path: "signup",
        element: <ProtectedRoute element={<SignUp />} path="signup" />,
      },
      {
        path: "todo",
        element: <ProtectedRoute element={<ToDo />} path="todo" />,
      },
    ],
  },
]);
function isLoggedIn() {
  const token = localStorage.getItem("token");
  return !!token;
}

function ProtectedRoute({
  element,
  path,
}: {
  element: JSX.Element;
  path: string;
}) {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (path === "signin" || path === "signup") {
      if (isLoggedIn()) {
        navigate("/todo");
      }
    } else {
      if (!isLoggedIn()) {
        navigate("/signin");
      }
    }
  }, [params]);

  return element;
}

export default router;
