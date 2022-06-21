import axios from 'axios'

export default async function getCurrency(): Promise<string | undefined> {
  try {
    const response = await axios.get(
      'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD'
    )

    return response.data[0]?.basePrice
  } catch (error) {
    console.log(error)
  }
}
