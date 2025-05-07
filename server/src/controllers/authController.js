import { User } from '../models/index.js'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.log("fill the required credentials");
        return res.status(400).json({ message: "fill the required credentials" });
    }

    try {
        const currentUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (!currentUser) {
            console.log("User Not Found");
            return res.status(400).json({ message: "User Not Found" });
        }

        const matchPass = await bcrypt.compare(password, currentUser.password)

        if (!matchPass) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        return res.status(200).json({
            message: 'Login successful.',
            user: {
                id: currentUser.id,
                username: currentUser.username,
                email: currentUser.email,
                name: currentUser.name,
            }
    })
    } catch (error) {
        return res.status(400).json("Error is ", error.message);
    }
}

export const signup = async(req,res) => {

    const { name,username,email,gender,password } = req.body;

    if(!username || !name || !email || !gender || !password){
        return res.status(401).json({message:"All fields are required."})
    }
    
    try{    
        const existingUser = await User.findOne({where:{email:email}})
        if(existingUser){
            return res.status(401).json({message:"Email already existed"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await user.create({
            name,
            username,
            hashedPassword,
            email,
            gender

        })
        if(!user){
            return res.status(400).json({message:"User not created"});
        }
        return res.status(200).json({
            message: 'User registered successfully.',
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              name: user.name,
            }
        })

    }catch(error){
        return res.status(500).json("error is ",error.message);
    }


}