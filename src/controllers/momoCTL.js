import crypto from "crypto";
import axios from "axios";
import momoConfig from "../configs/momoCF.js";

export const paymentRequest = async (req, res) => {
  const { amount, orderId, orderInfo } = req.body;

  const requestId = orderId;
  const orderType = "momo_wallet";
  const extraData = "";

  const rawSignature = `partnerCode=${momoConfig.partnerCode}&accessKey=${momoConfig.accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${momoConfig.returnUrl}&notifyUrl=${momoConfig.notifyUrl}&extraData=${extraData}`;
  const signature = crypto
    .createHmac("sha256", momoConfig.secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode: momoConfig.partnerCode,
    accessKey: momoConfig.accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    returnUrl: momoConfig.returnUrl,
    notifyUrl: momoConfig.notifyUrl,
    extraData,
    requestType: "captureMoMoWallet",
    signature,
  };

  try {
    const response = await axios.post(momoConfig.apiEndpoint, requestBody);
    res.status(200).json({
      data:response.data
    });
  } catch (error) {
    console.error("Error creating Momo payment:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const transactionCompleted = async (req, res) => {
    const { partnerCode, orderId, requestId, amount, orderInfo, orderType, transId, resultCode, message, payType, responseTime, extraData, signature } = req.body;

    const rawSignature = `partnerCode=${partnerCode}&orderId=${orderId}&requestId=${requestId}&amount=${amount}&orderInfo=${orderInfo}&orderType=${orderType}&transId=${transId}&resultCode=${resultCode}&message=${message}&payType=${payType}&responseTime=${responseTime}&extraData=${extraData}`;
    const expectedSignature = crypto.createHmac('sha256', momoConfig.secretKey).update(rawSignature).digest('hex');
  
    if (signature === expectedSignature) {
      // Xử lý kết quả thanh toán
      if (resultCode === '0') {
        // Thanh toán thành công
        console.log('Payment success');
      } else {
        // Thanh toán thất bại
        console.log('Payment failed');
      }
      res.status(200).json({ message: 'Received' });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
};
