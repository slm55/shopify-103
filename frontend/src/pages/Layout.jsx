import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div className='flex flex-col h-screen w-full justify-between'>
    <Header />
    <Outlet />
    <Footer />
    </div>
  )
}

export default Layout