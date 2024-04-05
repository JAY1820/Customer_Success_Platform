// App.js
import React from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header"; 
import Layout from './components/Layout';
import UserLogin from './pages/UserLogin';
import AdminDashboard from "./pages/admin/AdminDashboard";
import AuditorDashboard from "./pages/auditor/AuditorDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import PmDashboard from "./pages/project_manager/Pmdashboard";
import "./App.css";

axios.defaults.baseURL = 'http://localhost:4004';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/auditor/dashboard" element={<AuditorDashboard />} />

          <Route path="/client/dashboard" element={<ClientDashboard />} />

          <Route path="/projectmanager" element={<PmDashboard />} />
          <Route path="/projectmanager/dashboard" element={<PmDashboard />} />


          <Route path='/header' element={<Header />} />
          <Route path='/userlogin' element={<UserLogin />} /> 

          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
