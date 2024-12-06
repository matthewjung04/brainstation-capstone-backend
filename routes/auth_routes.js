import express from 'express'
import * as authController from '../controllers/auth-controllers.js'

const authRouter = express.Router();

authRouter.route('/sign-up')
  .post(authController.postSignUp)

authRouter.route('/sign-in')
  .post(authController.postSignIn)

export default authRouter;