namespace Types {
  export interface HtmlInterface extends Element {
    name?: string
    tags?: string[]
    text?: string
    style?: { display: string }
  }

  export interface Option {
    timeout: number
  }

  export interface Game {
    name: string
    image: string
    date: string
    rating: number
    price: number
    bargainPrice: number
    discountRate: number
    tag: string
    serialNum: string
    description: string
  }
}
