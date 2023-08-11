const mercadopage = require("mercadopago");
const { MERCADOPAGO_API_KEY } = require("../config.js");
const {
  NOTIFICATION_URL_MP,
  SUCCESS_MP,
  FAILURE_MP,
  PENDING_MP,
} = require("../sqlYMercadopago.js");
const { Cart } = require("../db");
const { createCart } = require("./cartControllers");

const postPayment = async (cart) => {
  if (!cart) {
    throw new Error("Datos incompletos");
  }
  let arrayItems = [];
  let result;
  for (let i = 0; i < cart[0]?.cartDetails?.length; i++) {
    let objectItem = {
      title: cart[0]?.cartDetails[i]?.package?.name,
      unit_price: cart[0]?.cartDetails[i]?.package?.price,
      currency_id: "ARS",
      quantity: cart[0]?.cartDetails[i]?.numberPeople,
    };

    if (!(Object.keys(objectItem).length === 0)) {
      arrayItems.push(objectItem);
    }
  }
  mercadopage.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  if (arrayItems.length > 0) {
    const idCart = cart[0]?.id;
    const mail = cart[0]?.user.mail;
    result = await mercadopage.preferences.create({
      items: arrayItems,
      back_urls: {
        success: SUCCESS_MP,
        pending: PENDING_MP,
        failure: FAILURE_MP,
      },
      notification_url: NOTIFICATION_URL_MP,
      metadata: { idCart: idCart, mail: mail },
    });
  }
  return result?.body;
};

const updateCartPayment = async (id) => {
  try {
    if (!id) return "All fields are required";

    const cartUpdate = await Cart.update(
      {
        statusCartId: 2,
      },
      { where: { id: id } }
    );
    if (cartUpdate[0]) {
      return { msg: "The cart has been update successfully", valor: true };
    }
    return { msg: "Id cart not found" };
  } catch (error) {
    return {
      msg: "Error updateCartById(cartController.js)",
      error: error,
    };
  }
};

const receiveWebhook = async (payment) => {
  if (payment.type === "payment") {
    const data = await mercadopage.payment.findById(payment["data.id"]);
    const cartUpdate = updateCartPayment(data.body?.metadata?.id_cart);
    const cartNew = await createCart(data.body?.metadata?.mail);
  }
  return;
};

module.exports = { postPayment, updateCartPayment, receiveWebhook };
