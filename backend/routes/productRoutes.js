import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { verifyJWT } from "../middleware/auth.js"; 
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", verifyJWT, requireAdmin, createProduct); 
router.put("/:id", verifyJWT, requireAdmin, updateProduct); 
router.delete("/:id", verifyJWT, requireAdmin, deleteProduct);

export default router;
