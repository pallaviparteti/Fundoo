import * as UserService from '../services/user.service';



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
    next(error);
  }
};


export const login = async (req , res, next ) =>
{
  try{
    const data = await UserService.login(req.body);
    res.status(data.code).json({
      code: data.code,
      data :data.data,
      message:data.message
    });
  }
  catch(error){
    next(error);
  }
}

