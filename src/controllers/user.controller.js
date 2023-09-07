import * as UserService from '../services/user.service';
import HttpStatus from 'http-status-codes';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST,).json
      ({ code : HttpStatus.BAD_REQUEST,
        message:`${error}`
  });
    }
  
};

export const login = async (req, res) => {
  try {
    const data = await UserService.login(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,

      message: `${error}`
    });
  }
};
//forget password
export const forgetPassword = async (req, res) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//reset password
export const resetPassword = async (req, res) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: '',
      message: data.message
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: '',
      message: `${error}`
    });
  }
 

