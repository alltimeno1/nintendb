import { Request, Response, NextFunction } from 'express'
import * as requestIp from 'request-ip'
import { boardRegExp } from '../utils/regular_expressions'
import errorType from '../utils/express'
import { Profile } from 'passport'
import { loadProfileImg } from '../utils/load_profile'
import * as Forum from '../services/forum.service'

// 게시판 조회
export const readForum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Forum.findBoard()
    const status = req.isAuthenticated()
    const profileImg = loadProfileImg(status, req)

    res.render('forum', { post, status, profileImg })
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시글 등록 페이지 조회
export const readForm = async (req: Request, res: Response, next: NextFunction) => {
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
  try {
    const { id } = req.params
    const post = await Forum.updateAndFindPost(id)
    const status = req.isAuthenticated()
    const checkMyPost = req.user && post ? (req.user as Profile).id === post.user_id : false
    const profileImg = loadProfileImg(status, req)

    if (!post) {
      res.status(404).send({
        message: 'There is no post with the id or DB disconnected :(',
      })
    }

    return res.render('post', { post, status, checkMyPost, profileImg })
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시글 등록
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
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
        await Forum.insertLogoutPost(title, nickname, password, text)

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
  try {
    const { id } = req.params
    const { post_id: postId, user_id: userId, password } = req.body

    if (userId) {
      await Forum.deleteLoginPost(postId, userId)

      res.redirect('/forum')
    } else {
      const result = await Forum.deleteLogoutPost(postId, password)

      if (result.deletedCount) {
        res.redirect('/forum')
      } else {
        res.send(
          `<script>alert('비밀번호를 정확히 입력해주세요!');location.href='/forum/${id}';</script>`
        )
      }
    }
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시글 수정
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    if (req.body.user_id) {
      const { title, user_id: userId, text } = req.body

      await Forum.updateLoginPost(id, userId, title, text)

      res.redirect(`/forum/${id}`)
    } else {
      const { title, nickname, password, text } = req.body
      const result = await Forum.updateLogoutPost(id, password, title, nickname, text)

      if (result) {
        res.redirect(`/forum/${id}`)
      } else {
        res.send(
          `<script>alert('비밀번호를 정확히 입력해주세요!.');location.href='/forum/update/${id}';</script>`
        )
      }
    }
  } catch (error) {
    return next(errorType(error))
  }
}

// 게시글 추천
export const updateRecommend = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { post_id: postId, user_id: userId } = req.body

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
