import express from 'express'
import { getUserForSidebar, updateProfile } from '~/controllers/user.controller'
import { protectRoute } from '~/middlewares/auth.middleware'

const router = express.Router()

router.put('/update-profile', protectRoute, updateProfile)
router.get('/get-users', protectRoute, getUserForSidebar)

export default router
