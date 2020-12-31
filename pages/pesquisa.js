import React, { useState } from 'react'
import PageTitle from '../components/pageTitle'

const Pesquisa = () => {
  const [form, setForm] = useState({
    NOME: '',
    EMAIL: '',
    WATHSAPP: '',
    NOTA: 0
  })

  const notas = [0, 1, 2, 3, 4, 5]

  const [sucess, setSucess] = useState(false)
  const [ret, setRet] = useState({})

  const salvar = async () => {
    try {
      const response = await fetch('api/save', {
        method: 'POST',
        body: JSON.stringify(form)
      })
      const data = await response.json()
      setSucess(true)
      setRet(data)
    } catch { (Error) }
  }

  const onChange = evt => {
    const value = evt.target.value
    const key = evt.target.name
    setForm(old => ({
      ...old,
      [key]: value
    }))
  }

  return (
    <div className=' mt-12 mb-12'>
      <PageTitle title='Pesquisa' />
      <h1 className='text-center font-bold my-4 text-2xl'>Críticas e Sugestões</h1>
      <p className='text-center'>
        O restaurante X sempre busca por atender melhor seus clientes.<br />
        Por isso, estamos sempre abertos a ouvir a sua opinião
      </p>

      {/*Não sucess renderiza a página com os inputs para preenchimento
          Se for sucess é sinal de que os campos foram preenchidos e enviados e então deve renderizar a página mostrando detalhes do cupom e promoção*/}
      {
        !sucess &&
        <div className='w-1/5 mx-auto mt-6'>
          <label className='font-bold'>Nome:</label>
          <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' name='NOME' placeholder='Nome' onChange={onChange} value={form.NOME} />
          <label className='font-bold'>Email:</label>
          <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' name='EMAIL' placeholder='Email' onChange={onChange} value={form.EMAIL} />
          <label className='font-bold'>Wathsapp:</label>
          <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' name='WATHSAPP' placeholder='Wathsapp' onChange={onChange} value={form.WATHSAPP} />

          {/* Abaixo fiz um map no array notas para renderizar cada elemento do array no formato de um radio */}
          <div className='flex py-6'>
            {notas.map(nota => {
              return (
                <label className='block w-1/6 text-center'>
                  {nota}<br />
                  <input type='radio' name='NOTA' value={nota} onChange={onChange} />
                </label>)
            })
            }
          </div>
          {/*Fim do map*/}

          <button className='bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow' onClick={salvar}>Salvar</button>
        </div>
      }

      {
        sucess &&
        <div className='w-1/5 mx-auto' >
          <p className='mb-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'>Obrigado por contribuir com sua sugestão ou crítica</p>
          {
            ret.showCoupon &&
            <div className='text-center border p-4 mb-4'>
              Seu cupom: <br />
              <span className='font-bold'>{ret.Coupon}</span>
            </div>
          }

          {
            ret.showCoupon &&
            <div className='text-center border p-4 mb-4'>
              <span className='font-bold block mb-2'>{ret.messageCoupon}</span>
              <br />
              <span className='italic'>Tire um print ou uma foto desta tela e apresente ao garçon.</span>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Pesquisa