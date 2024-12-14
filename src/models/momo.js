import mongoose from "mongoose";

const momo = new mongoose.Schema({
    orderId: String,
    requestId: String,
    amount: Number,
    orderInfo: String,
    transId: String,
    resultCode: String,
    message: String,
    payType: String,
    responseTime: Date,
    extraData: String,
  });
  export default mongoose.model("momo",momo)