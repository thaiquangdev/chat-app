import express from 'express'
import { createGroup } from '~/controllers/group.controller'
import { protectRoute } from '~/middlewares/auth.middleware'

const router = express.Router()

router.post('/create-group', protectRoute, createGroup)

export default router
