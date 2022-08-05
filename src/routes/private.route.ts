import * as express from 'express'
import * as Private from '../controllers/private.controller'

const router = express.Router()

router.get('/', Private.readPrivate)

router.put('/', Private.updateBucket)

router.delete('/', Private.deleteBucket)

export = router
