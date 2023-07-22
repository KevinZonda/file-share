import {useEffect, useState} from "react";
import {Button, DatePicker, Input, Select, Space} from "antd";
import {ConfigStore, FileAPI} from "../store";
import type {DatePickerProps} from 'antd/es/date-picker';
import {Editor, useMonaco} from "@monaco-editor/react";
import './uploadPasteBinPage.css'
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";

export const UploadPasteBinPage = () => {
  const monaco = useMonaco()
  useEffect(() => {
    if (monaco) {
      console.log('[Editor] Macro instance', monaco);
    }
  }, [monaco]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Unnamed");
  const [expireAt, setExpireAt] = useState<number>(Date.now);
  const [lang, setLang] = useState("md");
  const [id, setId] = useState<string | undefined>(undefined);

  const onOk = (value: DatePickerProps['value']) => {
    if (value) {
      const d = value.toDate()
      setExpireAt(d.getTime())
    }
  };
  return (<div className="zroot">

    <Title>
      Upload to KevinZonda Υ
    </Title>

    <Space direction='horizontal' style={{width: '100%', marginBottom: '6px'}}>
      {"File Name:"}

      <Input onChange={(e) => setTitle(e.target.value)} value={title}/>
      <Select
        value={lang}
        style={{width: '100%'}}
        onChange={(e) => setLang(e)}
        options={[
          {value: 'md', label: 'Markdown'},
          {value: 'text', label: 'Text'},
          {value: 'csharp', label: 'C#'},
          {value: 'go', label: 'Go'},
          {value: 'py', label: 'Python'},
          {value: 'js', label: 'JavaScript'},
          {value: 'ts', label: 'TypeScript'},
          {value: 'c', label: 'C'},
          {value: 'cpp', label: 'C++'},
          {value: 'sh', label: 'Shell'}]}
      />

    </Space>
    <Space direction='horizontal' style={{width: '100%', marginBottom: '20px'}}>
      {"Expire At:"}
      <DatePicker showTime onOk={onOk}/>
      <Button type="primary" onClick={() =>
        FileAPI.uploadPastebin({
          content: text,
          expired_at: Math.floor(expireAt / 1000),
          name: title
        }, ConfigStore.AxiosOptions).then(res => setId(res.data.id))}>Upload</Button>
    </Space>

    <div style={{width: '100%', height: '50vh', background: 'blue', padding: '2px'}}>
        <Editor
          language={lang}
          onChange={(v) => v && setText(v)}
          width={'100%'}
          height={'100%'}
          theme={ConfigStore.DefaultTheme() === 'dark' ? 'vs-dark' : 'vs'}
        />
    </div>
    {
      id && id !== ''
        ? <><br></br><Link to={`/files/${id}`}>{id}</Link></>
        : <>  </>
    }


  </div>)
}