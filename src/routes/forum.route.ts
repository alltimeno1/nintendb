import * as express from 'express'
import * as Forum from '../controllers/forum.controller'

const router = express.Router()

router.get('/', Forum.readForum)

router.get('/filter', Forum.readKeyword)

router.get('/post', Forum.readForm)

router.get('/:id/edit', Forum.readUpdate)

router.get('/:id', Forum.readPost)

router.post('/', Forum.createPost)

router.post('/:id', Forum.deletePost)

router.patch('/:id', Forum.updatePost)

router.post('/:id/likes', Forum.updateLikes)

export = router
