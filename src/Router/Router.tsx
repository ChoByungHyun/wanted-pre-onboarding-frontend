import { createBrowserRouter } from "react-router-dom";
import App from "App";
import SignIn from "Pages/SignIn";
import SignUp from "Pages/SignUp";
import ToDoList from "Pages/ToDoList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "SignIn",
        element: <SignIn />,
      },
      {
        path: "SignUp",
        element: <SignUp />,
      },
      {
        path: "ToDoList",
        element: <ToDoList />,
      },
    ],
  },
]);

export default router;
