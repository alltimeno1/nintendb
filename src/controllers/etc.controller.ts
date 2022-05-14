import { Request, Response, NextFunction } from 'express'
import { findSortedList, insertInquery } from '../services/etc.service'
import { loadProfileImg, loadProfileEmail } from '../utils/load_profile'
import { boardRegExp } from '../utils/regular_expressions'
import errorType from '../utils/express'

const readDomain = async (req: Request, res: Response) => res.redirect('/home')

// 페이지 조회
const readEtc = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page } = req.params
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)

    if (page === 'home') {
      const [best, recent, sale] = await findSortedList()

      res.render('index', { best, recent, sale, status, profileImg })
    } else if (page === 'etc') {
      const email = loadProfileEmail(status, req)

      res.render(page, { status, email, profileImg })
    } else {
      res.render(page, { status, profileImg })
    }
  } catch (error) {
    return next(errorType(error))
  }
}

// 문의하기
const createInquery = async (req: Request, res: Response, next: NextFunction) => {
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

export { readDomain, readEtc, createInquery }
