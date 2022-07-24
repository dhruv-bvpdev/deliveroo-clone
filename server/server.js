import dotenv from "dotenv";
import express from "express";
import paymentRoute from "./routes/paymentRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/get-publishable-key", (req, res) => {
  res.send({ key: process.env.STRIPE_PUB_KEY });
});

app.use("/api/payment", paymentRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server up and running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  );
});
