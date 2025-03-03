import express from 'express'
import { getMessages, sendMessage } from '~/controllers/message.controller'
import { protectRoute } from '~/middlewares/auth.middleware'

const router = express.Router()

router.post('/send', protectRoute, sendMessage)
router.get('/:id', protectRoute, getMessages)

export default router
