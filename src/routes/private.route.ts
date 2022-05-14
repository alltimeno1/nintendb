import * as express from 'express'
import { readPrivate, deleteItem, deleteBucket } from '../controllers/private.controller'

const router = express.Router()

router.get('/', readPrivate)

router.post('/delete', deleteItem)

router.post('/reset', deleteBucket)

export = router
