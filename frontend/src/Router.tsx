import {createBrowserRouter} from "react-router-dom";
import UploadPage from "./pages/uploadPage.tsx";
import {FileInfoPage} from "./pages/fileInfoPage.tsx";
import {UploadPasteBinPage} from "./pages/uploadPasteBinPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UploadPage />,
  },
  {
    path: "/pastebin",
    element: <UploadPasteBinPage />,
  },
  {
    path: "/files/:id",
    element: <FileInfoPage />,
  }
]);
