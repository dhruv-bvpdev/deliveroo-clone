import express from "express";
const router = express.Router();

import { makePayment } from "../controllers/paymentController.js";

router.route("/").post(makePayment);

export default router;
