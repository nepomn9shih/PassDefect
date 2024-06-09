import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';

const element = document.getElementById('root');
const data = (window as any).__data__;
// Удаляем данные, необходимо для сборки мусора
delete (window as any).__data__;

if (element) {
  const root = ReactDOM.createRoot(element);

  root.render(
    <React.StrictMode>
      <App data={data} />
    </React.StrictMode>
  );
}
