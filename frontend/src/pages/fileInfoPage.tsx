import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {API_BASE_PATH, FileInfoStore} from "../store";
import {Badge, Button, Card, Input} from "antd";
import {useState} from "react";
import Title from "antd/es/typography/Title";

function fileSize(bytes: number | undefined, si = false, dp = 1) {
  if (!bytes || bytes < 0) {
    return 'Unknown';
  }

  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

export const FileInfoPage = observer(() => {
  const {id} = useParams();
  const [password, setPassword] = useState('');
  if (!id) {
    return <>No id :X</>;
  }
  const info = FileInfoStore.getInfo(id);
  if (!info) {
    if (FileInfoStore.isLoading) {
      return <>Loading...</>;
    }
    return <>No data :(</>;
  }

  if (info.password === true) {
    return (
      <div className={'xroot'}>
        <Title>Password Protected</Title>
        <Input.Password placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
        <Button type="primary" onClick={() => {
          FileInfoStore.getInfoWithPassword(id, password, true)
        }}>Enter</Button>
      </div>
    );
  }
  return (
    <div className={'xroot'}>
      <Badge.Ribbon text="by KevinZonda">
        <Card title={`File ID: ${id ?? ""}`} size="small"
              style={{width: '80vw'}}>
          <div style={{width: '100%', textAlign: 'left', paddingLeft: '20px', paddingRight: '20px'}}>
            <p>{`File: ${info.name ?? 'unnamed'}`}</p>
            <p>{`Size: ${fileSize(info.size)}`}</p>
            <p>{`Uploaded At: ${info.uploaded_at ? new Date(info.uploaded_at * 1000) : 'unknown'}`}</p>
            <p>{`Expired At: ${info.expired_at ? new Date(info.expired_at * 1000) : 'unknown'}`}</p>
            {
              info.paste_bin === true &&
                <>
                    <p>{`Content: ${info.content ?? ""}`}</p>
                </>
            }
          </div>


          <Button type="primary"
                  href={`${API_BASE_PATH}/file/${id}${info.password ? "?password=" + info.password : ""}`}
                  style={{margin: '6px'}}>Download</Button>
          <Button type="link" onClick={() => {
            navigator.clipboard.writeText(window.location.href)
          }} style={{margin: '6px'}}>Copy link</Button>
        </Card>

      </Badge.Ribbon>
    </div>
  )
})