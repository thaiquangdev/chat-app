import express from 'express'
import { getMessages } from '~/controllers/message.controller'
import { protectRoute } from '~/middlewares/auth.middleware'

const router = express.Router()

router.get('/send/:id', protectRoute, getMessages)

export default router
