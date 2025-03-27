import { Resend } from 'resend';
import nodemailer  from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.RESEND_API_KEY){
    console.log('provide RESEND_API in dotenv file')
}
// const NODEMAILER_USERID = process.env.NODEMAILER_USERID
// const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD
// if(!NODEMAILER_USERID || !NODEMAILER_PASSWORD){
//     console.log('provide nodemailer user id and password in dotenv file')
// }
const resend = new Resend(process.env.RESEND_API_KEY);



// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: NODEMAILER_USERID,
//     pass: NODEMAILER_PASSWORD,
//   },
// });

// const  sendEmail = async({sendTo,subject,html})=> {
//   const info = await transporter.sendMail({
//     from: 'blinkit <onboarding@resend.dev>', 
//     to: sendTo, 
//     subject: subject, 
//     text: subject, 
//     html: html, 
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);


const sendEmail = async ({sendTo,subject,html}) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'blinkit <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
          });
          if (error) {
            return console.error({ error });
          }
          return data
    } catch (error) {
        console.log(error)
    }
}


export default sendEmail