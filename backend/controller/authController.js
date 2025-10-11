import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import genToken  from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Sign up error: ${error.message}` });
  }
};

export const logIn = async(req, res)=>{
    try{
        const {email, password} =req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "Email does not Exists!"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                message : "Incorrect Password"
            })
        }

        const token = await genToken(user._id);
        res.cookie("token", token,{
            httpOnly:true,
            maxAge : 10*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })

        return res.status(200).json(user)

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: `Login error ${error}`
        })
    }
}

export const logOut = async(req, res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({
            message : "log Out Successfully!"
        })
    }catch(error){
        return res.status(500).json({
            message: `Logout error ${error}`
        })
    }
}