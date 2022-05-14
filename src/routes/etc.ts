import * as express from 'express'
import { domain, etc, postInquery } from '../controllers/etc.controller'
const router = express.Router()

router.get('/', domain)

router.get('/:page', etc)

// 문의하기
router.post('/etc', postInquery)

export = router
