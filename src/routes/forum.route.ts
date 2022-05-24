import * as express from 'express'
import * as Forum from '../controllers/forum.controller'
const router = express.Router()

router.get('/', Forum.readForum)

router.get('/post', Forum.readForm)

router.get('/:id/update', Forum.readUpdate)

router.get('/:id', Forum.readPost)

router.post('/', Forum.createPost)

router.post('/:id', Forum.deletePost)

router.post('/:id/update', Forum.updatePost)

router.post('/:id/likes', Forum.updateLikes)

export = router
