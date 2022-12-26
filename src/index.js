import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import FBRedirect from './components/FBRedirect';
import Test from './components/Test';
import  store from './components/store'
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>      //This mode has been disabled to check if useEffect is triggered twice
    <BrowserRouter>
    <Provider store={store}>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="messages" element={<Messages />} />
        <Route path="fbredirect" element={<FBRedirect />} />
        <Route path="/album" element={<Test />} />
      </Routes>
    </Provider>
    </BrowserRouter>
  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
