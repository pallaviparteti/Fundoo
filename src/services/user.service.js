import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
import sendMail from '../utils/user.util';
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//create new user
export const newUser = async (body) => {
  const password = body.password;
  const saltRounds = 10;
  var data;
  const isExist = await User.findOne({ email: body.email });
  if (isExist) {
    data = {
      code: HttpStatus.BAD_REQUEST,
      data: `${body.Email} Already Exist.`,
      message: 'user already exist'
    };
  } else {
    var hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUserObj = {
      ...body,
      password: hashedPassword
    };
  var res = await User.create(newUserObj);
    data = {
      code: HttpStatus.CREATED,
      data: res,
      message: 'user register successfully'
    };
  }

  return data;
};

// login user
export const login = async (body) => {
  var data;
  const emailValidation = await User.findOne({
    email: body.email
  });
  if (emailValidation) {
    const passwordMatch = await bcrypt.compare(
      body.password,
      emailValidation.password
    );
    if (passwordMatch) {
      const token = await jwt.sign(
        { _id: emailValidation._id, email: emailValidation.email },
        process.env.SECRETE_KEY,{expiresIn:'300s'}
      );
      data = {
        code: HttpStatus.OK,
        data: token,
        message: 'user login successfully'
      };
    } else {
      data = {
        code: HttpStatus.BAD_REQUEST,
        data: '',
        message: 'password mismatched'
      };
    }
  } else {
    data = {
      code: HttpStatus.BAD_REQUEST,
      data: '',
      message: 'invalid credentials'
    };
  }
  return data;
};
// forget password
export const forgetPassword = async (body) => {
  const findEmail = await User.findOne({ email: body.email });
  if (findEmail) {
    const token = jwt.sign(
      { _id: findEmail.id, email: findEmail.email },
      process.env.FORGET_PASSWORD_KEY
    );
    sendMail(findEmail.email, token);
    var data = {
      code: HttpStatus.OK,
      data: '',
      message: 'email has been send to the resisterd user'
    };
  } else {
    throw new Error('Oops we cant find email');
  }
  return data;
};

export const resetPassword = async (body) => {
  const saltRounds = 10;
  const password = body.password;
  var hashedPass = await bcrypt.hash(password, saltRounds);
  body.password = hashedPass;
  const dataValue = await User.findByIdAndUpdate({ _id: body._id }, body, {
    new: true
  });
  var data = {
    code: HttpStatus.OK,
    data: dataValue,
    message: 'password has been changed successfully'
  };
  if (!dataValue) {
    throw new Error('Invalid user id. ');
  } else {
    return data;
  }
};
