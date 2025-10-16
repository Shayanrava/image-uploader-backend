import express from "express";
import { deleteProduct, getProduct, saveProduct, singleProduct, updateProduct } from "../controller/ProductController.js";

const router = express.Router()

router.get("/products" , getProduct) // http://localhost:5070/products
router.post("/products" ,saveProduct)
router.put("/products/:id" ,updateProduct)
router.get("/products/:id" ,singleProduct)
router.delete("/products/:id" , deleteProduct)


export default router;