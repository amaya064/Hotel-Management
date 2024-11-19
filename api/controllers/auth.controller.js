import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

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