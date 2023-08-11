const { Router } = require("express");
const router = Router();
const { receiveWebhook } = require("../controllers/paymentController");

router.post("/webhook", async (req, res) => {
  const payment = req.query;
  const resultpayment = await receiveWebhook(payment);
  res.sendStatus(204);
});

router.get("/success", (req, res) => res.send("Success"));

module.exports = router;
