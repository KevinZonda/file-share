import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {API_BASE_PATH, FileInfoStore} from "../store";
import {Badge, Button, Card} from "antd";

export const FileInfoPage = observer(() => {
  const {id} = useParams();
  if (!id) {
    return <>No id</>;
  }
  const info = FileInfoStore.getInfo(id);
  if (!info) {
    return <>No info</>;
  }


  return (
    <>
      <Badge.Ribbon text="by KevinZonda">
        <Card title={`File ID: ${id ?? ""}`} size="small"
              style={{width: '80vw'}}>
          <div style={{width: '100%', textAlign: 'left', paddingLeft: '20px', paddingRight: '20px'}}>
            <p>{`File: ${info.name ?? 'unnamed'}`}</p>
            <p>{`Size: ${info.size ?? -1}`}</p>
            <p>{`Uploaded At: ${info.uploaded_at ? new Date(info.uploaded_at * 1000) : 'unknown'}`}</p>
            <p>{`Expired At: ${info.expired_at ? new Date(info.expired_at * 1000) : 'unknown'}`}</p>
          </div>
          <Button href={`${API_BASE_PATH}/file/${id}`}>Download</Button>
        </Card>
      </Badge.Ribbon>
    </>
  )
})