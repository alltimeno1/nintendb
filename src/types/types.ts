namespace Types {
  export interface HtmlInterface extends Element {
    name?: string
    tags?: string[]
    text?: string
    style?: { display: string }
  }

  export interface CSSInterface extends Element {
    style: {
      'max-height': string
    }
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

  export interface NaverProfile {
    _json: {
      email: string
      nickname: string
      profile_image: string
      id: string
    }
  }

  export type UpdateLoginPost<T> = (id: T, userId: T, title: T, text: T) => void
}
