import TextArea from "antd/es/input/TextArea";
import {useState} from "react";
import {Button} from "antd";
import {ConfigStore, FileAPI} from "../store";

export const UploadPasteBinPage = () => {
  const [text, setText] = useState("");
  return (<>
    Upload to KevinZonda Υ
    <TextArea onChange={(e) => setText(e.target.value)}/>
    <Button onClick={() =>
      FileAPI.uploadPastebin({
        content: text,
        expired_at: Date.now() / 1000 + 60 * 60 * 24 * 7,
      }, ConfigStore.AxiosOptions)}>Upload</Button>
  </>)
}