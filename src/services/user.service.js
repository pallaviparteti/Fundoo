import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
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
      const token = await jwt.sign({_id:emailValidation._id, email:emailValidation.email},process.env.SECRETE_KEY );
     console.log("this is the generated token",token)
      data = {
        code: HttpStatus.OK,
        data:  token,
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
