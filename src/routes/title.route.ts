import * as express from 'express'
import * as Title from '../controllers/title.controller'

const router = express.Router()

router.get('/', Title.readTitle)

router.get('/filter', Title.readKeyword)

router.get('/:id', Title.readDetails)

router.post('/bucket', Title.updateWishItem)

router.post('/:id', Title.createComment)

router.delete('/:id', Title.deleteComment)

export = router
