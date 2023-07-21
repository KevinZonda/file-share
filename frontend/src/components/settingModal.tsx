import {observer} from "mobx-react-lite";
import {Button, Input, Modal, Space} from "antd";
import {useState} from "react";
import {EyeInvisibleOutlined, EyeTwoTone, SettingOutlined} from "@ant-design/icons";
import {ConfigStore} from "../store";


export const SettingModal = observer(() => {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState(ConfigStore.ApiKey);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    //setLoading(true);
    ConfigStore.ApiKey = apiKey
    setOpen(false)
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button style={{margin: '6px'}} icon={<SettingOutlined/>} onClick={showModal}/>
      <Modal
        open={open}
        title="Configuration"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Space direction={'vertical'} style={{width: '100%'}}>
          <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                          addonBefore={"API Key"} value={apiKey} onChange={(e) => setApiKey(e.target.value)}/>
        </Space>
      </Modal>
    </>
  )
})