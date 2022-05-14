import * as express from 'express'
import * as title from '../controllers/title.controller'

const router = express.Router()

const { readTitle, readKeyword, readDetails, updateWishItem, createComment, deleteComment } = title

router.get('/', readTitle)

router.get('/filter', readKeyword)

router.get('/:id', readDetails)

router.post('/bucket', updateWishItem)

router.post('/:id', createComment)

router.post('/:id/delete', deleteComment)

export = router
