import { Request, Response, NextFunction } from 'express'
import * as requestIp from 'request-ip'
import * as bcrypt from 'bcrypt'
import { Profile } from 'passport'
import { boardRegExp } from '../utils/regular_expressions'
import * as Forum from '../services/forum.service'
import throwError from '../utils/throwError'

// 게시판 조회
export const readForum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Forum.findBoard()
    const { status, profileImg } = res.locals.user

    return res.render('forum', { post, status, profileImg })
  } catch (error) {
    return next(error)
  }
}

// 게시판 특정 키워드 조회
export const readKeyword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sortBy, keyword } = req.query as { sortBy: string; keyword: string }
    const { status, profileImg } = res.locals.user
    const post = await Forum.findKeyword(sortBy, keyword)

    return res.render('forum', { post, status, profileImg })
  } catch (error) {
    return next(error)
  }
}

// 게시글 등록 페이지 조회
export const readForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, profileImg } = res.locals.user

    return res.render('form', { status, profileImg })
  } catch (error) {
    return next(error)
  }
}

// 게시글 수정 페이지 조회
export const readUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { status, profileImg } = res.locals.user
    const post = await Forum.findPostLog(id)
    const checkMyPost = req.user && post ? (req.user as Profile).id === post.user_id : false

    return res.render('update_form', { post, status, checkMyPost, profileImg })
  } catch (error: any) {
    return next(error)
  }
}

// 게시글 조회
export const readPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { status, profileImg } = res.locals.user
    const post = await Forum.updateAndFindPost(id)
    const checkMyPost = req.user && post ? (req.user as Profile).id === post.user_id : false

    if (!post) {
      throwError(404, '페이지를 찾을 수 없습니다.')
    }

    return res.render('post', { post, status, checkMyPost, profileImg })
  } catch (error) {
    return next(error)
  }
}

// 게시글 등록
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, text } = req.body
    const { status } = res.locals.user

    if (status) {
      const { displayName, id: userId } = req.user as Profile

      await Forum.insertLoginPost(title, displayName, userId, text)

      return res.redirect('forum')
    }

    const { nickname, password } = req.body
    const message = boardRegExp(title, '', nickname, password, '')

    if (!message && text) {
      const hashedPassword = await bcrypt.hash(password, 10)

      await Forum.insertLogoutPost(title, nickname, hashedPassword, text)

      return res.redirect('forum')
    }

    return res.send(`<script>alert('${message}');location.href='/form';</script>`)
  } catch (error: any) {
    return next(error)
  }
}

// 게시글 삭제
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { postId, userId, password } = req.body

    if (userId) {
      await Forum.deleteLoginPost(postId, userId)

      return res.redirect('/forum')
    }

    const hashedPassword = await Forum.findLogoutPost(postId)

    if (!hashedPassword) {
      throwError(404, '페이지를 찾을 수 없습니다.')
      return
    }

    const samePassword = await bcrypt.compare(password, hashedPassword)

    if (!samePassword) {
      return res.send(
        `<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/forum/${id}';</script>`
      )
    }

    await Forum.deleteLogoutPost(postId)

    return res.redirect('/forum')
  } catch (error) {
    return next(error)
  }
}

// 게시글 수정
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { userId } = req.body

    if (userId) {
      const { title, userId, text } = req.body

      await Forum.updateLoginPost(id, userId, title, text)

      return res.end()
    }

    const { title, nickname, password, text } = req.body
    const hashedPassword = await Forum.findLogoutPost(id)

    if (!hashedPassword) {
      return throwError(404, '페이지를 찾을 수 없습니다.')
    }

    const samePassword = await bcrypt.compare(password, hashedPassword)

    if (!samePassword) {
      return res.status(401).end()
    }

    await Forum.updateLogoutPost(id, title, nickname, text)

    return res.end()
  } catch (error) {
    return next(error)
  }
}

// 게시글 추천
export const updateLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { postId, userId } = req.body

    if (userId) {
      await Forum.updateRecommend(postId, userId)
    } else {
      const ip = requestIp.getClientIp(req) as string

      await Forum.updateRecommend(postId, ip)
    }

    return res.redirect(`/forum/${id}`)
  } catch (error) {
    return next(error)
  }
}
