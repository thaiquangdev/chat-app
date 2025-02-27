import express from 'express'
import { updateProfile } from '~/controllers/user.controller'
import { protectRoute } from '~/middlewares/auth.middleware'

const router = express.Router()

router.put('/update-profile', protectRoute, updateProfile)

export default router
