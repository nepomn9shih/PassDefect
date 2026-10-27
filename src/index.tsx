import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import type {AllGameState} from './reducers/types';

declare global {
	interface Window {
		__data__?: Partial<AllGameState>;
	}
}

const element = document.getElementById('root');
const data = window.__data__ ?? {};
// Удаляем данные, необходимо для сборки мусора
delete window.__data__;

if (element) {
  const root = ReactDOM.createRoot(element);

  root.render(
    <React.StrictMode>
      <App data={data} />
    </React.StrictMode>
  );
}
