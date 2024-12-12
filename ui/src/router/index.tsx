import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/default";
import QueryView from "../views/query";
import TableView from "../views/table";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
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
