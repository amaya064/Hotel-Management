import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async ( req, res, next) => {
   const { usrname, email, password } = req.body;
   const hashedPassword =  bcryptjs.hashSync(password, 10) 
   const newuser = new User ({ username,email,password, });
   try{
    await newuser.save()
    res.status(201).json(newuser);

   } catch (error) {
   next(error);
   } 
};



export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try{
      const validuser = await user.findOne({ email: email });
      if (!validuser)return next(errorHandlerler ( 404, 'user not found!'));
        const validpassword = bcryptjs.compareSync(password, validuser.password);
         if(!validPassword) return next(errorHandler(401, 'Wrong credential!'));
           const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET, )
           const { password:pass, ...rest } = validuser;
            res
            .cookie('access_token',token, { httpOnly: true})
            .status(200)
            .json(rest);
           

    }catch(error){
      next(error);
    }
};