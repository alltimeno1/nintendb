import * as express from 'express'
import * as Etc from '../controllers/etc.controller'

const router = express.Router()

router.get('/', Etc.readDomain)

router.get('/home', Etc.readHome)

router.get('/etc', Etc.readEtc)

router.post('/inquiry', Etc.createInquiry)

router.post('/currency', Etc.changeCurrency)

export = router
