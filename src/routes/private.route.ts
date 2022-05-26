import * as express from 'express'
import { readPrivate, updateBucket, deleteBucket } from '../controllers/private.controller'

const router = express.Router()

router.get('/', readPrivate)

router.put('/', updateBucket)

router.delete('/', deleteBucket)

export = router
