import * as express from 'express'
import * as Forum from '../controllers/forum.controller'
const router = express.Router()

router.get('/', Forum.readForum)

router.get('/post', Forum.readForm)

router.get('/update/:id', Forum.readUpdate)

router.get('/:id', Forum.readPost)

router.post('/', Forum.createPost)

router.post('/:id', Forum.deletePost)

router.post('/update/:id', Forum.updatePost)

router.post('/:id/recommend', Forum.updateRecommend)

export = router
