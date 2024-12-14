import User from "../models/User.js";
import { singinValidator, singupValidator } from "../validation/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_CODE } = process.env;

export const singUp = async (req, res) => {
  try {
    //b1:validate dữ liệu người dùng
    const { error } = singupValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    //b2:kiểm tra xem email có tồn tại trong hệ thống hay chưa
    const userExits = await User.findOne({
      email: req.body.email,
    });
    if (userExits) {
      return res.status(400).json({
        message: "Email đã được đăng ký, bạn có muốc đăng nhập không?",
      });
    }

    //b3: mã hóa password
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    //b4: khởi tạo user trong db
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    //b5: thông báo cho người dùng đăng ký thành công
    //xóa mật khẩu đi
    user.password = undefined;
    return res.status(200).json({
      message: "đăng ký tài khoản thành công",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const singIn = async (req, res) => {
  try {
    //b1:validate từ phái khách hàng
    const { error } = singinValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    //b2:kiểm tra xem email có tồn tại  hay chưa
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({
        message: "Email này chưa được đăng ký, bạn có muốn đăng ký  không?",
      });
    }
    //b3:kiểm tra password
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }
    //b4: tạo JWT
    const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE, {
      expiresIn: "1d",
    });
    console.log("accessToken",accessToken);

    //b5: thông báo cho người dùng đăng nhập thành công

    user.password = undefined;
    return res.status(200).json({
      message: "đăng nhập thành công",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const AllUser = await User.find();

    console.log("userId", AllUser);
    //b4: tạo JWT

    //b5: thông báo cho người dùng đăng nhập thành công

    return res.status(200).json({
      message: "đăng nhập thành công",
      data: AllUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    console.log("userId", userId);
    //b4: tạo JWT

    //b5: thông báo cho người dùng đăng nhập thành công

    return res.status(200).json({
      message: "đăng nhập thành công",
      userId,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).jon({
        status: "err",
        message: "err",
      });
    }
    const user = await User.findOne({
      _id: userId,
    });

    return res.status(200).json({
      message: "đăng nhập thành công",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const logOutUser = async (req, res) => {
  try {
      
      return res.status(200).jon({
        status: "oke",
        message: "thành công",
      });      
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
