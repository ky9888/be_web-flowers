import jwt from"jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"
dotenv.config()
const{SECRET_CODE}=process.env

export const checkPermisson = async(req,res,next)=>{
    try {
        //b1:người dùng đăng nhập hay chưa?
        const token = req.headers.authorization?.split(" ")[1]
        //b2:kiểm tra token
        if(!token){
            return res.status(403).json({
                message:"bạn chưa đăng nhập"
            })
        }
        //b3:kiểm tra quyền của người dùng
        const decoded=jwt.verify(token,SECRET_CODE);
        const user = await User.findById(decoded._id)
        if(!user){
            return res.status(403).json({
                message:"Token lỗi!",
            })
        }
        if(user.role !=="admin"){
            return res.status(400).json({
                message:"Bạn không có quyền làm việc này"
            })
        }
        req.user = user;
        //b4:next
        next()

        
    } catch (error) {
        return res.json({
            name:"lỗi",
            message:error.message
        })
    }

}