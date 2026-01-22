import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cardetails from './pages/Cardetails';
import Car from './pages/Car';
import Mybookings from './pages/Mybookings';
import Footer from './components/Footer'
import OwnerLayout from './pages/owner/OwnerLayout'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import UserLogin from './pages/auth/UserLogin'
import UserSignup from './pages/auth/UserSignup'
import AdminLogin from './pages/auth/AdminLogin'
import AdminSignup from './pages/auth/AdminSignup'
import RequireAdmin from './components/RequireAdmin'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<Cardetails />} />
        <Route path='/cars' element={<Car />} />
        <Route path='/my-bookings' element={<Mybookings />} />


        <Route path="/owner/add-car" element={<AddCar />} />
        <Route path="/admin/add-car" element={<AddCar />} />

        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/signup' element={<AdminSignup />} />

        <Route path='/owner' element={<RequireAdmin><OwnerLayout /></RequireAdmin>}>
          <Route index element={<OwnerDashboard />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-cars' element={<ManageCars />} />
          <Route path='manage-bookings' element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App