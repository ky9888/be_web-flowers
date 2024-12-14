import { Router } from "express";
import { paymentRequest, transactionCompleted } from "../controllers/momoCTL.js";


const momo =Router()
momo.post("/momo-payment",paymentRequest)
momo.post("/momo-notify",transactionCompleted)

export default momo
