import User from '../models/user.model';
import HttpStatus from 'http-status-codes';


//create new user
export const newUser = async (body) => {
  var data;
  const isExist = await User.findOne({ Email: body.Email });
  if (isExist) {
    data = {
      code: HttpStatus.BAD_REQUEST,
      data: `${body.Email} Already Exist.`,
      message:'user already exist'
    }
  
  } else {
    var res = await User.create(body);
    data = {
      code: HttpStatus.CREATED,
      data:res,
      message:'user created successfully'
    }
  }
  return data;
};
