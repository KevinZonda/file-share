import {createBrowserRouter} from "react-router-dom";
import UploadPage from "./pages/uploadPage.tsx";
import {FileInfoPage} from "./pages/fileInfoPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UploadPage />,
  },
  {
    path: "/files/:id",
    element: <FileInfoPage />,
  }
]);
