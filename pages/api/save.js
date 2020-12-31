//Api que salva dados na planilha

import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentials.json'
import moment from 'moment'

const doc = new GoogleSpreadsheet(process.env.SHEET_ID)

const gerarCupom = () => {
  const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase() //Gera cupom baseado na hora e converte para hexadecimal
  return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4) //Formata uma máscara para o cupom
}

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENTE_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY
    })
    await doc.loadInfo()

    const sheetSaveData = doc.sheetsByIndex[1]
    const data = JSON.parse(req.body)

    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A3:B3')

    const showPromotion = sheetConfig.getCell(2, 0)
    const messagePromotion = sheetConfig.getCell(2, 1)

    let Coupon = ''
    let messageCoupon = ''

    if (showPromotion.value === 'Verdadeiro') {
      Coupon = gerarCupom()
      messageCoupon = messagePromotion.value
    }

    await sheetSaveData.addRow({
      NOME: data.NOME,
      EMAIL: data.EMAIL,
      WATHSAPP: data.WATHSAPP,
      'DATA PREENCHIMENTO': moment().format('DD/MM/YYYY HH:mm:ss'),
      NOTA: parseInt(data.NOTA),
      CUPOM: Coupon,
      PROMO: messageCoupon
    })
    res.end(JSON.stringify({
      showCoupon: Coupon !== '',
      Coupon,
      messageCoupon
    }))
  } catch (err) {
    console.log(err)
  }
}