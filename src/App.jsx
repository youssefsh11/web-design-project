import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import Donations from './pages/Donations/Donations'
import DashboardNav from './components/DashboardNav/DashboardNav'
import OrderTracking from './pages/OrderTracking/OrderTracking'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Favorites from './pages/Favorites/Favorites'

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const donationPaths = ['/', '/donations'];
  const isDonationRoute = donationPaths.includes(location.pathname);

  const handleSearch = (query = "") => {
    setSearchTerm(query.trim());
  };

  return (
    <>
      <div className='app'>
        <DashboardNav/>
        {!isDonationRoute && <Navbar onSearch={handleSearch}/>}
        <Routes>
          <Route path='/' element={<Donations/>}/>
          <Route path='/donations' element={<Donations/>}/>
          <Route path='/restaurant' element={<Home searchTerm={searchTerm}/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/order-tracking' element={<OrderTracking/>}/>
          <Route path='/myorder' element={<MyOrders/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
