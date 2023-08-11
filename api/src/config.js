const { config } =require("dotenv");

config();

const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;

module.exports = {
    MERCADOPAGO_API_KEY
  };
