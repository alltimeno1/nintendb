import { Request, Response, NextFunction } from 'express'
import * as Etc from '../services/etc.service'
import * as boardRegExp from '../utils/regular_expressions'
import getCurrency from '../utils/currency_api'

export const readDomain = async (req: Request, res: Response) => res.redirect('/home')

// 메인 페이지 조회
export const readHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currency } = req.cookies
    const { status, profileImg } = res.locals.user
    const { best, recent, sale } = await Etc.findSortedList()
    const exchangeRate = await getCurrency()

    return res.render('index', { best, recent, sale, status, profileImg, currency, exchangeRate })
  } catch (error) {
    return next(error)
  }
}

// 고객 지원 페이지 조회
export const readEtc = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, profileImg, email } = res.locals.user

    return res.render('etc', { status, email, profileImg })
  } catch (error) {
    return next(error)
  }
}

// 문의하기
export const createInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, message } = req.body
    const validationMsg = boardRegExp('', message, name, '', email)

    if (!validationMsg) {
      await Etc.insertInquery(name, email, message)

      return res.send(`<script>alert('감사합니다!');location.href='/etc';</script>`)
    }

    return res.send(`<script>alert('${validationMsg}');location.href='/etc';</script>`)
  } catch (error) {
    return next(error)
  }
}

// 화폐 선택
export const changeCurrency = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currency } = req.body

    return res.cookie('currency', currency).redirect('back')
  } catch (error) {
    return next(error)
  }
}
