import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
   console.log("bearerToken --->" , bearerToken)
 
    if (!bearerToken)
      throw new Error('Authorization token is required')
    //  {
    //     // code: HttpStatus.BAD_REQUEST,
    //     message: 'Authorization token is required'
    //   };
    bearerToken = bearerToken.split(' ')[1];

    // console.log("brearerToken after spliting -----> ",bearerToken);
    const user = await jwt.verify(bearerToken, process.env.SECRETE_KEY);
    req.body._id = user._id
    // res.locals.user = user;
    // res.locals.token = bearerToken;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
