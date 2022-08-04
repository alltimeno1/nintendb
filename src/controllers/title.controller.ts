import { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcrypt'
import * as requestIp from 'request-ip'
import { Profile } from 'passport'
import { boardRegExp } from '../utils/regular_expressions'
import * as Title from '../services/title.service'
import throwError from '../utils/throwError'
import getCurrency from '../utils/currency_api'

// 모든 게임 조회
const readTitle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currency } = req.cookies
    const { sort } = req.query as { sort: string }
    const { status, profileImg } = res.locals.user
    const top10 = await Title.findTop10()
    const title = await Title.findTitles(sort)
    const exchangeRate = await getCurrency()

    return res.render('title', { top10, title, status, profileImg, currency, exchangeRate })
  } catch (error) {
    return next(error)
  }
}

// 특정 키워드 게임 조회
const readKeyword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currency } = req.cookies
    const { keyword, tags } = req.query as { keyword: string; tags: string | string[] }
    const { status, profileImg } = res.locals.user
    const top10 = await Title.findTop10()

    if (keyword) {
      const title = await Title.findByQuery(keyword)

      return res.render('title', { top10, title, status, profileImg })
    }

    if (tags) {
      const title = await Title.findByTags(tags)

      return res.render('title', { top10, title, status, profileImg, tags, currency })
    }

    return res.redirect('/title')
  } catch (error) {
    return next(error)
  }
}

// 게임 정보 조회
const readDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { title, comment } = await Title.findTitleDetails(id)
    const { status, profileImg } = res.locals.user

    if (!title) {
      return throwError(404, '페이지를 찾을 수 없습니다.')
    }

    return status
      ? res.render('title_info_login', { title, comment, profileImg })
      : res.render('title_info', { title, comment })
  } catch (error) {
    return next(error)
  }
}

// 찜하기
const updateWishItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.body
    const { status } = res.locals.user

    if (status) {
      const { id: userId } = req.user as Profile

      await Title.updateWishItem(userId, gameId)
    } else {
      const ip = requestIp.getClientIp(req) as string

      await Title.updateWishItem(ip, gameId)
    }

    return res.send(
      `<script>alert('관심 목록에 ${gameId}가 추가되었습니다!');location.href='/title/${gameId}';</script>`
    )
  } catch (error) {
    return next(error)
  }
}

// 댓글 등록
const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId, text } = req.body
    const { status } = res.locals.user

    if (status) {
      const { displayName, id: userId } = req.user as Profile

      await Title.updateLoginComment(gameId, userId, displayName, text)

      return res.redirect(`/title/${gameId}`)
    }

    const { user_name: userName, password } = req.body
    const message = boardRegExp('', text, userName, password, '')

    if (!message) {
      const hashedPassword = await bcrypt.hash(password, 10)

      await Title.updateLogoutComment(gameId, userName, hashedPassword, text)

      return res.redirect(`/title/${gameId}`)
    }

    return res.send(`<script>alert('${message}');location.href='/title/${gameId}';</script>`)
  } catch (error) {
    return next(error)
  }
}

// 댓글 삭제
const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId, password } = req.body
    const { status } = res.locals.user

    if (status) {
      const { id: userId } = req.user as Profile

      await Title.deleteLoginComment(userId, commentId)
    } else {
      const hashedPassword = await Title.findLogoutComment(commentId)

      if (!hashedPassword) {
        return throwError(404, '요청하신 번호의 댓글이 존재하지 않습니다.')
      }

      const samePassword = await bcrypt.compare(password, hashedPassword)

      if (!samePassword) {
        return res.status(401).end()
      }

      await Title.deleteLogoutComment(commentId)
    }

    return res.end()
  } catch (error) {
    return next(error)
  }
}

export { readTitle, readKeyword, readDetails, updateWishItem, createComment, deleteComment }
