import * as express from 'express'
import {
  readDomain,
  readHome,
  readEtc,
  createInquiry,
  changeCurrency,
} from '../controllers/etc.controller'

const router = express.Router()

router.get('/', readDomain)

router.get('/home', readHome)

router.get('/etc', readEtc)

router.post('/inquiry', createInquiry)

router.post('/currency', changeCurrency)

export = router
