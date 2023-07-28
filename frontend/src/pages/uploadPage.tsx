import '../App.css'
import {Button, Input, message, UploadFile} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {API_BASE_PATH, ConfigStore} from "../store";
import {useState} from "react";
import {RcFile} from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import {Link} from "react-router-dom";
import {SettingModal} from "../components/settingModal.tsx";
import Title from "antd/es/typography/Title";


function UploadPage() {
  const [file, setFile] = useState<UploadFile>();
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const props: UploadProps = {
    multiple: false,
    beforeUpload: (f) => {
      setFile(f)
      return false
    }
  };
  const handleUpload = () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file as RcFile)
    setUploading(true);
    // You can use any AJAX library you like
    fetch(`${API_BASE_PATH}/file/upload${password !== '' ? `?password=${password}` : ''}`, {
      method: 'POST',
      body: formData,
      headers: {
        "Authorisation": ConfigStore.ApiKey
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setFile(undefined);
        message.success('Upload successfully.');
        setId(res.id)
      })
      .catch(() => {
        message.error('Upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <div  className="xroot">
      <Title>Upload to KevinZonda Υ</Title>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single upload. Strictly prohibited from uploading company data or other
          banned files.
        </p>
      </Dragger>
      <Input.Password style={{marginTop: 16}} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={file === undefined}
        loading={uploading}
        style={{margin: 6, marginTop: 16}}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
      <Button href={"/pastebin"}>
        PasteBin
      </Button>
      <SettingModal/>
      {
        id && id !== ''
          ? <><br></br><Link to={`/files/${id}`}>{id}</Link></>
          : <>  </>
      }
    </div>
  )
}

export default UploadPage
