//Api que pega os dados da planilha

import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentials.json'

const doc = new GoogleSpreadsheet(process.env.SHEET_ID)

const fromBase64 = value => {
  const buff = Buffer.from(value, 'base64')
  return buff.toString('ascii')
}

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENTE_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
    })
    await doc.loadInfo()

    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A3:B3')

    const showPromotion = sheetConfig.getCell(2, 0) //Pegando o valor da linha de index 2/coluna index 0

    const messagePromotion = sheetConfig.getCell(2, 1) //Pegando o valor da linha de index 2/coluna index 1

    res.end(JSON.stringify({
      showCoupon: showPromotion.value === 'Verdadeiro',
      message: messagePromotion.value
    }))
  } catch (err) {
    res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }))
  }
}