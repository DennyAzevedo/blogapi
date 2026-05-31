import { Router } from 'express'
import * as authController from '../controllers/auth.controller'

export const authRoutes = Router()

authRoutes.post('/signin', authController.signIn)
authRoutes.post('/signup', authController.signUp)
authRoutes.post('/validate', authController.validate)