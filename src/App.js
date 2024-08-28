import './App.css';
import { BrowserRouter, Route, Routes } from'react-router-dom';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebar from './Components/Sidebar/Siderbar';
import VehiclesList from './Pages/VehiclesList/VehiclesList';
function App() {
  
  
  return (
    
<BrowserRouter>
<div className="d-flex app">
   <Sidebar/>
 <div className='col'>
  <div className='app'>
  {/* <Navbar/>  */}
   <Routes>
     <Route path="/" element={<AdminLogin />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/vehicleslist" element={<VehiclesList />} />
   </Routes>
   </div>
   </div>
   </div>
  
 </BrowserRouter>
  );
}

export default App;
