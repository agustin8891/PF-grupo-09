const { Router } = require("express");
const router = Router();
const {
  postPayment,
  updateCartPayment,
} = require("../controllers/paymentController");
const { createCart } = require("../controllers/cartControllers");



router.post("/", async (req, res) => {
  const cart = req.body;
  try {
    const payment = await postPayment(cart);
    res.send(payment);
    return res.status(200).json(payment);
  } catch (error) {
    return error;
  }
});

router.put("/", async (req, res) => {
  const { id, mail } = req.body;

  try {
    //actualizar el carrito comprado (cambio de estado)
    let cartUpdate = await updateCartPayment(id);
    // crear un carrito nuevo a ese usuario
    let cartNew = await createCart(mail);

    return res.status(200).json(cartNew);
  } catch (error) {
    return error;
  }
});


// router.post("/webhook", async (req, res) => {
//   const payment = req.query;
//   const resultpayment = await receiveWebhook(payment);
//   res.sendStatus(204);
// });




// router.get("/success", (req, res) => res.send("Success"));

module.exports = router;
