import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'
import 'bootstrap/dist/css/bootstrap.min.css';

//ReactDOM.render(<MyfExample></MyfExample>, document.getElementById("root"))
const root = document.getElementById("root");

// 使用 createRoot 创建根 Root 对象
const rootContainer = ReactDOM.createRoot(root);

// 渲染组件
rootContainer.render(<App />);