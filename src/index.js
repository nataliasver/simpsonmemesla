import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import AdminMemes from './AdminMemes';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <BrowserRouter>
          <Routes>
              <Route path='/' element={<App/>}>
              </Route>
              <Route path='/adminmemesla' element={<AdminMemes />}>
              </Route>
              <Route path="*" element={<p>404 not found</p>} />
          </Routes>
      </BrowserRouter>

  </React.StrictMode>
);
