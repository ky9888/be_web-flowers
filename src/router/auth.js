import { Router } from "express";
import passport from "passport";
import "../router/products.js";
import dotenv from "dotenv";
dotenv.config();
import {
  getAllUser,
  getDetailUser,
  logOutUser,
  singIn,
  singUp,
  updateUser,
} from "../controllers/auth.js";
import { loginSuccess } from "../controllers/authgg.js";

const routerAuth = Router();
routerAuth.post("/singup", singUp);
routerAuth.post("/singin", singIn);
routerAuth.post("/logout", logOutUser);
routerAuth.put("/updateUser/:id", updateUser);
routerAuth.get("/all", getAllUser);
routerAuth.get("/getDetailUser/:id", getDetailUser);

routerAuth.get("/login/success", (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        
      });
    }
  } catch (error) {
    console.log(error);
  }
});

routerAuth.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

routerAuth.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/loginGoogle/${req.user?.id}`);
  }
);
routerAuth.post("/login-success/:googleId",loginSuccess)

export default routerAuth;
