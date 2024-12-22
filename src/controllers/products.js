import products from "../models/product.js";
import { remove as removeDiacritics } from "diacritics";

export const createProducts = async (req, res) => {
  const newProduct = new products(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json({
      message: "tạo sản phẩm thành công",
      data: saveProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "tạo sản phẩm thất bại",
    });
  }
};

const diacriticMap = {
  "dong ho": "đồng hồ",
  ao: "áo",
  giay: "giày",
};

const convertToDiacritics = (str) => {
  const words = str.split(" ");
  const convertedWords = words.map((word) => diacriticMap[word] || word);
  return convertedWords.join(" ");
};

export const getAllProduct = async (req, res) => {
  try {
    const { name, ...query } = req.query;

    let productsData;

    if (name) {
      const diacriticTitle = convertToDiacritics(name);

      const normalizedTitle = removeDiacritics(diacriticTitle)
        .split(" ")
        .join(".*");

      const allProducts = await products.find({});

      productsData = allProducts.filter((product) =>
        removeDiacritics(product.name).match(new RegExp(normalizedTitle, "i"))
      );
    } else {
      productsData = await products.find(query);
    }

    return res.status(200).json({
      message: name ? "Tìm sản phẩm thành công" : "Lấy sản phẩm thành công",
      data: productsData,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

export const getDetailProduct = async (req, res) => {
  let productName = req.params.name;

  try {
    const productDetail = await products.findOne({ name: productName }).maxTimeMS(10000);
    return res.status(200).json({
      message: "tìm  sản phẩm thành công",
      data: productDetail,
      date: productName,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
function formatPrice(price) {
  const cleanedPrice = price.trim().replace(/\./g, "");
  return parseFloat(cleanedPrice);
}
export const getHighestPrice = async (req, res) => {
  try {
    const { name, ...query } = req.query;

    let productsData;

    productsData = await products.find(query);

    return res.status(200).json({
      message: name ? "Tìm sản phẩm thành công" : "Lấy sản phẩm thành công",
      data: productsData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getTopicProducts = async (req, res) => {
  let productTopic = req.params.topic;

  try {
    const productDetailTopic = await products.find({ topic: productTopic });
    return res.status(200).json({
      message: "tìm  sản phẩm thành công",
      data: productDetailTopic,
      date: productTopic,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getTypeProducts = async (req, res) => {
  let productType = req.params.type;
  console.log(productType);

  try {
    const productDetailType = await products.find({ type: productType });
    return res.status(200).json({
      message: "tìm  sản phẩm thành công",
      data: productDetailType,
      date: productType,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const updateProducts = await products.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updateProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const updateProducts = await products.findByIdAndDelete(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updateProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
