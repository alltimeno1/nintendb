import { Request, Response, NextFunction } from 'express'
import * as requestIp from 'request-ip'
import { boardRegExp } from '../utils/regular_expressions'
import errorType from '../utils/express'
import { Profile } from 'passport'
import { loadProfileImg } from '../utils/load_profile'
import * as Title from '../services/title.service'

// 모든 게임 조회
const readTitle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sort } = req.query as { sort: string }
    const [title, top10] = await Title.findTitles(sort)
    const status = req.isAuthenticated()
    let profileImg = loadProfileImg(status, req)

    res.render('title', { top10, title, status, profileImg })
  } catch (error) {
    return next(errorType(error))
  }
}

// 특정 키워드 게임 조회
const readKeyword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { keyword, tags } = req.query as { keyword: string; tags: string | string[] }
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)

    if (keyword) {
      const [title, top10] = await Title.findByQuery(keyword)

      res.render('title', { top10, title, status, profileImg })
    }

    if (tags) {
      const [title, top10] = await Title.findByTags(tags)

      res.render('title', { top10, title, status, profileImg, tags })
    }

    res.redirect('/title')
  } catch (error) {
    return next(errorType(error))
  }
}

// 게임 정보 조회
const readDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const [title, comment] = await Title.findTitleDetails(id)
    const status = req.isAuthenticated()

    if (!title) {
      res.status(404).send({
        message: 'There is no title with the id or DB disconnected :(',
      })
    }

    if (status) {
      const profileImg = loadProfileImg(status, req)

      res.render('title_info_login', { title, comment, profileImg })
    } else {
      res.render('title_info', { title, comment })
    }
  } catch (error) {
    return next(errorType(error))
  }
}

// 찜하기
const updateWishItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.body

    if (req.isAuthenticated()) {
      const { id: userId } = req.user as Profile

      await Title.updateWishItem(userId, gameId)
    } else {
      const ip = <string>requestIp.getClientIp(req)

      await Title.updateWishItem(ip, gameId)
    }

    res.send(
      `<script>alert('관심 목록에 ${gameId}가 추가되었습니다!');location.href='/title/${gameId}';</script>`
    )
  } catch (error) {
    return next(errorType(error))
  }
}

// 댓글 등록
const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId, text } = req.body

    if (req.isAuthenticated()) {
      const { displayName, id: userId } = req.user as Profile

      await Title.updateLoginComment(gameId, userId, displayName, text)

      res.redirect(`/title/${gameId}`)
    } else {
      const { user_name: userName, password } = req.body
      const message = boardRegExp('', text, userName, password, '')

      if (!message) {
        await Title.updateLogoutComment(gameId, userName, password, text)

        res.redirect(`/title/${gameId}`)
      } else {
        res.send(`<script>alert('${message}');location.href='/title/${gameId}';</script>`)
      }
    }
  } catch (error) {
    return next(errorType(error))
  }
}

// 댓글 삭제
const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { commentId, password, titleId } = req.body

    if (req.isAuthenticated()) {
      const { id: userId } = req.user as Profile

      await Title.deleteLoginComment(userId, commentId)
    } else {
      const result = await Title.deleteLogoutComment(commentId, password)

      if (!result) {
        return res.send(
          `<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/title/${id}';</script>`
        )
      }
    }

    res.redirect(`/title/${titleId}`)
  } catch (error) {
    return next(errorType(error))
  }
}

export { readTitle, readKeyword, readDetails, updateWishItem, createComment, deleteComment }
