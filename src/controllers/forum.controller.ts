import { Request, Response, NextFunction } from 'express'
import * as requestIp from 'request-ip'
import * as bcrypt from 'bcrypt'
import { boardRegExp } from '../utils/regular_expressions'
import errorType from '../utils/checkErrorType'
import { Profile } from 'passport'
import { loadProfileImg } from '../utils/load_profile'
import * as Forum from '../services/forum.service'
import throwError from '../utils/throwError'

// 게시판 조회
export const readForum = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Forum']
  try {
    const post = await Forum.findBoard()
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)

    res.render('forum', { post, status, profileImg })
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시판 특정 키워드 조회
export const readKeyword = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Forum']
  try {
    const { sortBy, keyword } = req.query as { sortBy: string; keyword: string }
    const post = await Forum.findKeyword(sortBy, keyword)
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)

    res.render('forum', { post, status, profileImg })
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시글 등록 페이지 조회
export const readForm = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Forum']
  try {
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)

    res.render('form', { status, profileImg })
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시글 수정 페이지 조회
export const readUpdate = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Forum']
  try {
    const { id } = req.params
    const post = await Forum.findPostLog(id)
    const status = req.isAuthenticated()
    const checkMyPost = req.user && post ? (req.user as Profile).id === post.user_id : false
    const profileImg = loadProfileImg(status, req)

    res.render('update_form', { post, status, checkMyPost, profileImg })
  } catch (error: any) {
    return next(errorType(error))
  }
}

// 게시글 조회
export const readPost = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Forum']
  try {
    const { id } = req.params
    const post = await Forum.updateAndFindPost(id)
    const status = req.isAuthenticated()
    const checkMyPost = req.user && post ? (req.user as Profile).id === post.user_id : false
    const profileImg = loadProfileImg(status, req)

    if (!post) {
      throwError(404, 'There is no post with the id or DB disconnected :(')
    }

    return res.render('post', { post, status, checkMyPost, profileImg })
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시글 등록
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Forum']
  try {
    const { title, text } = req.body

    if (req.isAuthenticated()) {
      const { displayName, id: userId } = req.user as Profile

      await Forum.insertLoginPost(title, displayName, userId, text)

      res.redirect('forum')
    } else {
      const { nickname, password } = req.body
      const message = boardRegExp(title, '', nickname, password, '')

      if (!message && text) {
        const hashedPassword = await bcrypt.hash(password, 10)

        await Forum.insertLogoutPost(title, nickname, hashedPassword, text)

        res.redirect('forum')
      } else {
        res.send(`<script>alert('${message}');location.href='/form';</script>`)
      }
    }
  } catch (error: any) {
    return next(errorType(error))
  }
}

// 게시글 삭제
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Forum']
  try {
    const { id } = req.params
    const { postId, userId, password } = req.body

    if (userId) {
      await Forum.deleteLoginPost(postId, userId)

      res.redirect('/forum')
    } else {
      const hashedPassword = await Forum.findLogoutPost(postId)

      if (!hashedPassword) {
        throwError(404, '요청하신 번호의 글이 존재하지 않습니다.')
        return
      }
      const samePassword = await bcrypt.compare(password, hashedPassword)

      if (!samePassword) {
        return res.send(
          `<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/forum/${id}';</script>`
        )
      }

      await Forum.deleteLogoutPost(postId)

      res.redirect('/forum')
    }
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시글 수정
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Forum']
  try {
    const { id } = req.params

    if (req.body.user_id) {
      const { title, userId, text } = req.body

      await Forum.updateLoginPost(id, userId, title, text)

      res.redirect(`/forum/${id}`)
    } else {
      const { title, nickname, password, text } = req.body
      const hashedPassword = await Forum.findLogoutPost(id)

      if (!hashedPassword) {
        throwError(404, '요청하신 번호의 글이 존재하지 않습니다.')
        return
      }

      const samePassword = await bcrypt.compare(password, hashedPassword)

      if (!samePassword) {
        return res.send(
          `<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/forum/${id}/update';</script>`
        )
      }

      await Forum.updateLogoutPost(id, title, nickname, text)

      res.redirect(`/forum/${id}`)
    }
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시글 추천
export const updateLikes = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Forum']
  try {
    const { id } = req.params
    const { postId, userId } = req.body

    if (userId) {
      await Forum.updateRecommend(postId, userId)
    } else {
      const ip = <string>requestIp.getClientIp(req)

      await Forum.updateRecommend(postId, ip)
    }
    res.redirect(`/forum/${id}`)
  } catch (error) {
    return next(errorType(error))
  }
}
