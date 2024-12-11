import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/default";
import QueryView from "../views/query";
import TableView from "../views/table";
import NotFound from "../views/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <QueryView />,
      },
      {
        path: "table/:database/:table",
        element: <TableView />,
      },
    ],
  },
]);
