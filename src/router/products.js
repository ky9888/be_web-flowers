import { Router } from "express";
import { createProducts,getComment,postComment, deleteProduct, getAllProduct,getHighestPrice,getTopicProducts,getTypeProducts, getDetailProduct, updateProduct, deleteComment } from "../controllers/products.js";

const productRouter =Router()
productRouter.post("/createProduct",createProducts)
productRouter.get("/getAllProducts",getAllProduct)
productRouter.get("/getHighestPrice",getHighestPrice)
productRouter.get("/getDetailProducts/:name",getDetailProduct)
productRouter.get("/getTopicProducts/:topic",getTopicProducts)
productRouter.get("/getTypeProducts/:type",getTypeProducts)
productRouter.put("/updateProducts/:id",updateProduct)
productRouter.delete("/deleteProducts/:id",deleteProduct)
productRouter.get("/comments",getComment)
productRouter.post("/comments",postComment)
productRouter.delete("/comments/:id",deleteComment)
export default productRouter
