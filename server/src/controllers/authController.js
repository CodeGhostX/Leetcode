import { User } from '../models/index.js'
import bcrypt from 'bcrypt'
import ErrorResponse from '../utils/common/error.js';
import { StatusCodes } from 'http-status-codes';
import SuccessResponse from '../utils/common/success.js';

const otpStore = {};

export const login = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.log("fill the required credentials");
        ErrorResponse.message = "fill the required credentials" 
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    try {
        const currentUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (!currentUser) {
            console.log("User Not Found");
            ErrorResponse.message = "User Not Found"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        const matchPass = await bcrypt.compare(password, currentUser.password)

        if (!matchPass) {
            ErrorResponse.message = "Invalid credentials" 
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        
        SuccessResponse.message = "Login successful";
        SuccessResponse.data = {
            user: {
                id: currentUser.id,
                username: currentUser.username,
                email: currentUser.email,
                name: currentUser.name,
            }
        }
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = error.message
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

export const signup = async (req, res) => {

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
        const user = await user.create({
            name,
            username,
            hashedPassword,
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

export const sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            console.log("User not found");
            ErrorResponse.message = "User not found";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);

        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailoptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Password Reset",
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`
        }


        await transporter.sendMail(mailoptions);
        SuccessResponse.message = "OTP sent successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        console.log("Cant send otp", error);
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.BAD_GATEWAY).json(ErrorResponse)

    }
}

export const updatePass = async (req, res) => {

    const { email,otp,newpassword } = req.body;
    const storedOtp = otpStore[email];

    if(!storedOtp || !storedOtp!=otp || Date.now() > storedOtp.expiresAt){
        console.log("Invalid or expired OTP");
        ErrorResponse.message = "Invalid or expired OTP";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    const hashedPassword = await bcrypt.hash(password,10);
    await User.update({password: hashedPassword},{where:{email:email}});

    delete otpStore[email];

    SuccessResponse.message = "Password updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);



}