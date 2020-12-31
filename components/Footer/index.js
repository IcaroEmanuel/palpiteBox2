import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-700 p-4'>
      <div className='container mx-auto text-center font-bold text-white'>
        Desenvolvido por: {' '}
        <a className='hover:underline' href='https://www.instagram.com/icaroemanuel.10/' target='blank'>Ícaro Emanuel</a>/ {' '}
        <a className='hover:underline' href='https://www.linkedin.com/in/%C3%ADcaro-emanuel-223932138/' target='blank'>Linkedin</a>/ {' '}
        <a className='hover>underline' target='blank'>GitHub</a>
        <div className='mt-4'>
          <img className='inline p-4' src='/logo_semana_fsm.png' alt='Semana FullStack Master' />
          <img className='inline p-4' src='/logo_devpleno.png' alt='DevPleno' />
        </div>
      </div>
    </div>
  )
}

export default Footer