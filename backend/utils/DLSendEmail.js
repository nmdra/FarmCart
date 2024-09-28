import 'dotenv/config'
import { log } from 'node:console'
import { createTransport } from 'nodemailer'

const mailServer = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

log('email send start')

mailServer.sendMail(
    {
        from: process.env.EMAIL_USER,
        to: process.env.TO_EMAIL,
        subject: 'new email',
        text: 'Amila Upul Kumara',
    },
    (err, infor) => {
        if (err) {
            log('cannot send the email')
        } else {
            log('email sent')
        }
    }
)

log('email send end')
