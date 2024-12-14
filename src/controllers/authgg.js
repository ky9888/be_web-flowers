import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const loginSuccess = async (req, res) => {
  
    try {
      const { googleId } = req.params;
      const user = await User.findOne({ googleId });
     
    if (user) {
      const accessToken = jwt.sign({ _id: user._id }, process.env.SECRET_CODE, {
        expiresIn: "1d",
      });
      console.log("accessToken",accessToken);
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user,accessToken
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
      
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };


  // const accessToken = jwt.sign({ _id: Usergg._id }, SECRET_CODE, {
      //   expiresIn: "1d",
      // });
      // console.log("accessToken",accessToken);
  
      // //b5: thông báo cho người dùng đăng nhập thành công
  
      // user.password = undefined;
      // return res.status(200).json({
      //   message: "đăng nhập thành công",
      //   accessToken,
      // });