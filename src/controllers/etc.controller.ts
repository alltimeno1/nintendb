import { Request, Response, NextFunction } from 'express'
import { findSortedList, insertInquery } from '../services/etc.service'
import { loadProfileImg, loadProfileEmail } from '../utils/load_profile'
import { boardRegExp } from '../utils/regular_expressions'
import errorType from '../utils/express'

const readDomain = async (req: Request, res: Response) => res.redirect('/home')

// 메인 페이지 조회
const readHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currency } = req.cookies
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)
    const [best, recent, sale] = await findSortedList()

    res.render('index', { best, recent, sale, status, profileImg, currency })
  } catch (error) {
    return next(errorType(error))
  }
}

// 고객 지원 페이지 조회
const readEtc = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)
    const email = loadProfileEmail(status, req)

    res.render('etc', { status, email, profileImg })
  } catch (error) {
    return next(errorType(error))
  }
}

// 문의하기
const createInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, message } = req.body
    const validationMsg = boardRegExp('', message, name, '', email)

    if (!validationMsg) {
      await insertInquery(name, email, message)

      res.send(`<script>alert('감사합니다!');location.href='/etc';</script>`)
    } else {
      res.send(`<script>alert('${validationMsg}');location.href='/etc';</script>`)
    }
  } catch (error) {
    return next(errorType(error))
  }
}

// 화폐 선택
const changeCurrency = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currency } = req.body
    console.log(currency)
    res.cookie('currency', currency).redirect('back')
  } catch (error) {
    return next(errorType(error))
  }
}

export { readDomain, readHome, readEtc, createInquiry, changeCurrency }
