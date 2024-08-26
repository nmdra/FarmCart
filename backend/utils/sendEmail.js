import nodemailer from 'nodemailer'

export const sendEmail = async (body) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.sendMail(body)

        return { success: true, message: 'Email sent successfully' }
    } catch (err) {
        return {
            success: false,
            message: `Error sending email: ${err.message}`,
        }
    }
}
