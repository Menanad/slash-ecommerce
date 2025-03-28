// imports by react
import React from 'react';
import ReactDOM  from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

// pages
import './index.css';
import App from './App';
import Menucontext from './comonants/context/context';
import { Router } from 'react-router-dom';
import WindowContext from './comonants/context/windowSize';
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Menucontext>
      <WindowContext>
        <App/>
      </WindowContext>
    </Menucontext>
  </React.StrictMode>
);
