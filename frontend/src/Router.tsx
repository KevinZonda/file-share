import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import {FileInfoPage} from "./pages/fileInfoPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <FileInfoPage />,
  }
]);
