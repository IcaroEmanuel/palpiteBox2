import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <React.Fragment>
      <div className='bg-gray-200 p-4 shadow-md'>
        <div className='container mx-auto'>
          <Link href='/'>
            <a><img className='mx-auto' src='/logo_palpitebox.png' alt='PalpiteBox' /></a>
          </Link>
        </div>
      </div>
      <div className='container text-center'>
        <div className='bg-gray-300 p-4 shadow-md'>
          <Link href='/sobre'>
            <a className='hover:underline p-2'>Sobre</a>
          </Link>
          <Link href='/contato'>
            <a className='hover:underline p-2'>Contato</a>
          </Link>
          <Link href='/pesquisa'>
            <a className='hover:underline p-2'>Pesquisa</a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Header