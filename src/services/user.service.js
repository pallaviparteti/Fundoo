 import userModel from '../models/user.model';
import User from '../models/user.model';
import HttpStatus from 'http-status-codes';


//create new user
export const newUser = async (body) => {
  var data;
  var res;
  const isExist = await User.findOne({ Email: body.Email });
  isExist ?
    data = {
      code: HttpStatus.BAD_REQUEST,
      data: `${body.Email} Already Exist.`,
      message:'user already exist'
    }:
    res = await User.create(body);
    data = {
      code: HttpStatus.CREATED,
      data:res,
      message:'user created successfully'
    }
  
  return data;
};

// login user
export const login = async (body) =>{
  var data;
  const logedin = await User.findOne({Email:body.Email,Password:body.Password});
  logedin?data={
      code:HttpStatus.OK,
      data:logedin,
      message:"user login successfully"}
      :
  data = {
    code:HttpStatus.BAD_REQUEST,
    data:'',
    message:'invalid credentials'

  }
  return data;
}









