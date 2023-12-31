import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as userController from '../controllers/user.controller';

import { newUserValidator } from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();
//route to create a new user
router.post('', newUserValidator,userController.newUser);

//route to create the login api
router.post('/login', userController.login);

//route to create the forget password
router.post('/forgetPassword', userController.forgetPassword);

//route to create resetPassword
router.post(
  '/resetPassword',
  userAuth,
  userController.resetPassword
);
export default router;
