import { User } from '../models/index.js'
import bcrypt from 'bcrypt'
import { ErrorResponse } from '../utils/common/index.js';
import { StatusCodes } from 'http-status-codes';
import { SuccessResponse } from '../utils/common/index.js';

export const createUser = async (req, res) => {
    const { name, username, email, gender, password } = req.body;

    if (!username || !name || !email || !gender || !password) {
        ErrorResponse.message = "fill all the credentials"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    try {
        const existingUser = await User.findOne({ where: { email: email } })
        if (existingUser) {
            console.log("Email already existed")
            ErrorResponse.message = "Email already existed"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
            email,
            gender

        })
        if (!user) {
            console.log("User not created");
            ErrorResponse.message = "User not created"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "User registered successfully";
        SuccessResponse.data = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
            }

        }
        return res.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}

export const getAllUsers = async(req,res) =>{
    try{
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        })
        if(users.length === 0){
            console.log("Users not found");
            ErrorResponse.message = "Users not found"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "Users found";
        SuccessResponse.data = users;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}

export const getUserById = async(req,res) =>{
    const userId = req.params.id;
    try{
        const user = await User.findByPk(userId,{
            attributes: {exclude: ['password']}
        })
        if(!user){
            console.log("User not found");
            ErrorResponse.message = "User not found"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        SuccessResponse.message = "User found";
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}

export const updateUser = async(req,res) =>{
    const userId = req.params.id;
    const updates = req.body;

    try{
        if(updates.password){
            const hashedPassword = await bcrypt.hash(updates.password,10);
            updates.password = hashedPassword;
        }
        const [affectedRows] = await User.update(updates, {where:{id:userId}});
        if(affectedRows === 0){
            console.log("User not updated");
            ErrorResponse.message = "User not updated"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        SuccessResponse.message = "User updated";
        SuccessResponse.data = updatedUser;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}

export const deleteUser = async(req,res) =>{

    const userId = req.params.id;

    try{
        const deletedUser = await User.destroy({where:{id:userId}});
        if(!deletedUser){
            console.log("User not deleted");
            ErrorResponse.message = "User not deleted";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        
        SuccessResponse.message = "User is deleted";
        return res.status(StatusCodes.OK).json(SuccessResponse);

    }catch(error){
        console.log(error.message);
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse);
    }
}