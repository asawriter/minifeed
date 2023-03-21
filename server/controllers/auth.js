import { comparePw, hashPw } from "../auth/handlePw.js";
import { loginSchema, registerSchema } from "../auth/validation.js"
import db from "../db/connectDb.js"
import {v4 as generateID} from "uuid"
import { isLogin, isLogout } from "../auth/index.js";

export const register = async (req, res, next) => {
    try {
        const {errors} = await registerSchema.validateAsync(req.body);
        if(errors) return res.status(400).json({message : errors.details[0].message})

        const [existUser] = await db.query('Select * from users where username = ?', [req.body.username]);
        if(existUser[0]) return res.status(409).json({message : 'User already exists.'});

        const hashedPassword = await hashPw(req.body.password);
        const values = [generateID(), req.body.email, req.body.username, hashedPassword]

        await db.query('Insert into users (`id`, `email`, `username`, `password`) values (?)', [values]);

        return res.status(200).json({message : "Created user successfully."})
    } catch (error) {
        return next(error)   
    }
}

export const login = async (req, res, next) => {
    try {
        const {errors} = await loginSchema.validateAsync(req.body);
        if(errors) return res.status(400).json({message : errors.details[0].message})

        const [foundUser] = await db.query('Select * from users where username = ?', [req.body.username])
        if(!foundUser[0]) return res.status(200).json({message : 'User not found.'})

        const checkedPassword = await comparePw(req.body.password, foundUser[0].password)
        if(!checkedPassword) return res.status(400).json({message : 'Password is incorect.'})

        await isLogin(req, foundUser[0])

        return res.status(200).json({message : 'Login successfully.', user : req.session.user})
    } catch (error) {
        return next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        await isLogout(req, res);

        return res.status(200).json({message : 'You have been logout.'})
    } catch (error) {
        return next(error)
    }
}