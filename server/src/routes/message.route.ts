import express from 'express'
import { getMessages, getMessagesGroup, sendMessage, sendMessageGroup } from '~/controllers/message.controller'
import { protectRoute } from '~/middlewares/auth.middleware'

const router = express.Router()

router.post('/send', protectRoute, sendMessage)
router.post('/send-group', protectRoute, sendMessageGroup)
router.get('/:id', protectRoute, getMessages)
router.get('/:groupId', protectRoute, getMessagesGroup)

export default router
