import express from "express";
import {addItem,updatequantity,getAllItems} from "../Controller/Item.js";
import { auth } from "../Middleware/Auth.js";
const router = express.Router();

router.post("/additem",auth,addItem)
router.patch("/updatequantity/:id",updatequantity)
router.get("/getallitems",auth,getAllItems)
router.get("/api/check-auth",auth)
export default router;