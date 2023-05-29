import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import { Home, CreatePost } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
    ],
  },
]);

export default router;
