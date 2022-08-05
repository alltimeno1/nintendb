import axios from 'axios'
import throwError from './throwError'

export default async function getCurrency() {
  try {
    const response = await axios.get(
      'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD'
    )

    return response.data[0]?.basePrice
  } catch (error) {
    return throwError(500, '환율 정보를 가져올 수 없습니다.')
  }
}
