import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import CSS here
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css"
import "./assets/style.scss"
import Providers from './store/Providers.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
    <ToastContainer/>
    <App />
    </Providers>
  </React.StrictMode>,
)
