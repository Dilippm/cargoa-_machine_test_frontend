import React from 'react';
import { Route, Routes } from "react-router-dom";
// import LoginForm from './pages/LoginForm';
// import RegistrationForm from './pages/RegistrationForm';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
import UserRoutes from './routes/UserRoutes';


function App() {
  return (
   
    <Routes>
                <Route exact="exact" path="/*" element={<UserRoutes />}/>
              

            </Routes>
  );
}

export default App;
