// config/momo.js
import dotenv from "dotenv";
dotenv.config();

const momoConfig = {
    partnerCode: 'MOMO',
    accessKey: process.env.ACCESSKEY,
    secretKey: process.env.SECRETKEY,
    apiEndpoint: 'https://test-payment.momo.vn/gw_payment/transactionProcessor',
    returnUrl: 'http://localhost:5000/api/momo/momo-payment',
    notifyUrl: 'http://localhost:5000/api/momo/',
  };
  
  export default momoConfig;
  