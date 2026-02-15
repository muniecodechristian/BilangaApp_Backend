import express from 'express'
import { chatWithIa } from '../controllers/chatIa.controller.js'
import {protectRoute} from '../middleware/auth.middleware.js'


const router =express.Router()


router.post('/',protectRoute,chatWithIa)




export default router