import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='container mx-auto text-center'>
        {children}
      </div>
      <Footer />
    </div>

  )
}

export default Layout