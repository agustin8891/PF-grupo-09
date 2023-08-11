let DB_HOST_NAME;
let DB_NAME;
let DB_USER;
let DB_PASSWORD;
let NOTIFICATION_URL_MP
let SUCCESS_MP
let PENDING_MP
let FAILURE_MP

if (process.env.DB_DESARROLLO) {

  DB_HOST_NAME = "localhost";
  DB_PASSWORD = "password";
  NOTIFICATION_URL_MP="https://62b7-186-13-96-240.ngrok-free.app/mercadopago/webhook"
  SUCCESS_MP="http://localhost:3001/success"
  PENDING_MP="http://localhost:3001/pending"
  FAILURE_MP="http://localhost:3001/failure"
} else {
/*   DB_HOST_NAME = "db.tgqewpehusbfkvybmawi.supabase.co";
  DB_PASSWORD = "SKhmu2od6c7YlbHn";
  NOTIFICATION_URL_MP="https://colegioespanol.vercel.app/mercadopago/webhook"
  SUCCESS_MP="https://colegioespanol.vercel.app/success"
  PENDING_MP="https://colegioespanol.vercel.app/pending"
  FAILURE_MP="https://colegioespanol.vercel.app/failure" */
}

DB_NAME = "postgres";
DB_USER = "postgres";
DB_PORT = 5432;



module.exports = {
  DB_HOST_NAME,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  PENDING_MP,
  NOTIFICATION_URL_MP,
  SUCCESS_MP,
  FAILURE_MP
};