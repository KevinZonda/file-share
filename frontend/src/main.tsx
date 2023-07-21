import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {router} from "./Router.tsx";
import {RouterProvider} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {ConfigProvider} from "antd";
import {ConfigStore} from "./store";
import {theme} from "antd";

const {defaultAlgorithm, darkAlgorithm} = theme;

export const Entry = observer(() => {
  return (
    <ConfigProvider
      theme={{
        algorithm: ConfigStore.DefaultTheme() === 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}>
      <RouterProvider router={router}/>
    </ConfigProvider>
  )
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Entry/>
  </React.StrictMode>,
)

