import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "App";
import SignIn from "Pages/SignIn";
import SignUp from "Pages/SignUp";
import ToDoList from "Pages/ToDoList";
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
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "todolist",
        element: <ProtectedRoute element={<ToDoList />} path="todolist" />,
      },
    ],
  },
]);
// Function to check if the user is logged in
function isLoggedIn() {
  const token = localStorage.getItem("token");
  return !!token;
}

// Wrap the router element with a custom component that handles redirection
function ProtectedRoute({
  element,
  path,
}: {
  element: JSX.Element;
  path: string;
}) {
  const navigate = useNavigate();

  if (path === "signin" || path === "signup") {
    if (isLoggedIn()) {
      navigate("/todolist");
      return null;
    }
  } else {
    if (!isLoggedIn()) {
      navigate("/signin");
      return null;
    }
  }

  return element;
}

export default router;
