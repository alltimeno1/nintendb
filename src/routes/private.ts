import * as express from 'express'
import { getPrivate, deleteItem, resetBucket } from '../controllers/private.controller'

const router = express.Router()

// MY 페이지 조회
router.get('/', getPrivate)

// MY 페이지 아이템 삭제
router.post('/delete', deleteItem)

// MY 페이지 아이템 리셋
router.post('/reset', resetBucket)

export = router
