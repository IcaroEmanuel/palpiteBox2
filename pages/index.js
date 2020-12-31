import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'//Hook usado para pegar os dados da planilha e trazer para o front-end
import PageTitle from '../components/pageTitle'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
  const { data, error } = useSWR('/api/get-promo', fetcher)
  return (
    <div className='mb-12'>
      <PageTitle title='Home' />
      <p className='mt-12 text-center'>
        O restaurante X sempre busca por atender melhor seus clientes.<br />
        Por isso, estamos sempre abertos a ouvir a sua opinião
      </p>
      <div className='my-12 text-center'>
        <Link href='/pesquisa'>
          <a className='bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow'>Dar opinião ou sugestão</a>
        </Link>
      </div>
      {!data && <p>Carregando...</p>}
      {!error && data && data.showCoupon &&
        <p className='mt-12 text-center'>
          {data.message}
        </p>
      }
    </div>
  )
}

export default Index 