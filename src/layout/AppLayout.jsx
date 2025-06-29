import React from 'react'
import Navbar from '../components/Navbar'


const AppLayout = ({ children, footer=true }) => {
  return (
    <div>
      <Navbar />
      <div >
        {children}
      </div>
      
    </div>
  )
}

export default AppLayout