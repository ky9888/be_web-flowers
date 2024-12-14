import express from "express";
import routerAuth from "./auth.js";
import routerImages from "./uploadImg.js";
import productRouter from "./products.js";
import momo from "./momoRT.js";



const router = express.Router();

router.use("/auth", routerAuth);
router.use("/images",routerImages );
router.use("/products",productRouter)
router.use("/momo",momo)





export default router;
