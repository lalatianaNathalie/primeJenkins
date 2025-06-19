import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './../../components/public/Navbar/Navbar';
import Footer from './../../components/public/Footer/Footer';

const Layout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Layout
