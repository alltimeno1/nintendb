import * as express from 'express'
import { readDomain, readEtc, createInquery } from '../controllers/etc.controller'
const router = express.Router()

router.get('/', readDomain)

router.get('/:page', readEtc)

router.post('/etc', createInquery)

export = router
