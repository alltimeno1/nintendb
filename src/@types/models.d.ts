declare namespace Models {
  export interface Game {
    name: string
    image: string
    date: Date
    rating: number
    price: number
    bargainPrice: number
    discountRate: number
    tag: string
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

  export interface Board {
    id: number
    title: string
    nickname: string
    password: string
    user_id: string
    text: string
    date: Date
    viewCount: number
    recommend: string[]
  }

  export interface Count {
    count: number
    name: string
  }

  export interface User {
    id: string
    email: string
    nickname: string
    provider: string
    profileImage: string
  }
}
