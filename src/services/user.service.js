import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
const bcrypt = require('bcrypt');

//create new user
export const newUser = async (body) => {
  const password = body.Password;
  const saltRounds = 10;
  var hashedPassword;
  var data;
  var res;
  const isExist = await User.findOne({ Email: body.Email });
  if (isExist) {
    data = {
      code: HttpStatus.BAD_REQUEST,
      data: `${body.Email} Already Exist.`,
      message: 'user already exist'
    };
  } else {
    hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUserObj = {
      Firstname: body.Firstname,
      Lastname: body.Lastname,
      Email: body.Email,
      Password: hashedPassword
    };
    res = await User.create(newUserObj);
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
    Email: body.Email
  });
  if (emailValidation) {
    const passwordMatch = await bcrypt.compare(
      body.Password,
      emailValidation.Password
    );
    if (passwordMatch) {
      data = {
        code: HttpStatus.OK,
        data: emailValidation,
        message: 'user login successfully'
      };
    } else {
      data = {
        code: HttpStatus.OK,
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
