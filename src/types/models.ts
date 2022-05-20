namespace Models {
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

  export interface Inquery {
    name: string
    email: string
    message: string
  }

  export interface Comment {
    game_id: string
    name: string
    password?: string
    id?: string
    text: string
  }

  export interface Bucket {
    id: string
    list: string[]
  }
}
