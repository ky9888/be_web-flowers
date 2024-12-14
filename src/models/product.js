import mongoose from "mongoose";
const product = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      
    },
    type: {
      type: String,
      
    },

    price: {
      type: String,
    },

    priceG: {
      type: String,
    },

    image1: {
      type: String,
    },
    image2: {
      type: String,
    },
    image3: {
      type: String,
    },

    describe: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
const products = mongoose.model("product", product);

export default products;
