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

  export interface NaverProfile {
    _json: {
      email: string
      nickname: string
      profile_image: string
      id: string
    }
  }

  export interface MyBucket {
    _id?: Object
    list?: string[]
    user_id?: string
    address?: string
  }

  export type UpdateLoginPost<T> = (id: T, userId: T, title: T, text: T) => void

  export interface customError extends Error {
    status?: number
  }
}
