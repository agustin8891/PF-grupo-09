const nodemailer = require('nodemailer');

const enviarMail = async (mail) =>{

 const config={
host:'smtp.gmail.com',
port: 465,
auth: {
     user: 'carloslamas3.0@gmail.com',
      pass: 'rpljrtykdaqodvnf'
      }
 }

const mensaje ={
from: 'carloslamas3.0@gmail.com',
to:`${mail}`,
subject: 'Bienvenid@ a Buspack',
text: 'Tu registro ha sido satisfactorio. Disfruta de la aventura <3'

}
const transport = nodemailer.createTransport(config)
const info =  await transport.sendMail(mensaje)
return info
}
module.exports={enviarMail}