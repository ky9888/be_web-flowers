import { Router } from "express";
import { createProducts, deleteProduct, getAllProduct,getHighestPrice,getTopicProducts,getTypeProducts, getDetailProduct, updateProduct } from "../controllers/products.js";

const productRouter =Router()
productRouter.post("/createProduct",createProducts)
productRouter.get("/getAllProducts",getAllProduct)
productRouter.get("/getHighestPrice",getHighestPrice)
productRouter.get("/getDetailProducts/:name",getDetailProduct)
productRouter.get("/getTopicProducts/:topic",getTopicProducts)
productRouter.get("/getTypeProducts/:type",getTypeProducts)
productRouter.put("/updateProducts/:id",updateProduct)
productRouter.delete("/deleteProducts/:id",deleteProduct)
export default productRouter
