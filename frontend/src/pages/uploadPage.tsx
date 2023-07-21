import '../App.css'
import {Button, message, UploadFile} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {API_BASE_PATH} from "../store";
import {useState} from "react";
import {RcFile} from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import {Link} from "react-router-dom";


function UploadPage() {
  const [file, setFile] = useState<UploadFile>();
  const [uploading, setUploading] = useState(false);
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
    fetch(`${API_BASE_PATH}/file/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setFile(undefined);
        message.success('upload successfully.');
        setId(res.id)
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <>
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
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={file === undefined}
        loading={uploading}
        style={{marginTop: 16}}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
      <Link to={`/files/${id}`}>{id}</Link>
    </>
  )
}

export default UploadPage
