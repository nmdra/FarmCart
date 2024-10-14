import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
} from './emailTemplate.js'
import { mailtrapClient, sender } from './mailtrap.config.js'

export const sendVerificationEmail = async (email, verificationCode) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                '{verificationCode}',
                verificationCode
            ),
            category: 'Email verification',
        })

        console.log('Email sent successfully', response)
    } catch (error) {
        console.log(`Error sending verification email:${error}`)
        throw new Error(`Error sending verification email:${error}`)
    }
}

export const sendWelcomeEmail = async (email, firstName) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: '36c30838-bef7-4212-9dbb-b25c80989599',
            template_variables: {
                company_info_name: 'Farmcart PVT LTD',
                name: firstName,
            },
        })

        console.log('Welcome Email sent successfully', response)
    } catch (error) {
        console.log(`Error sending Welcome email:${error}`)
        throw new Error(`Error sending Welcome email:${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Request',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
                '{resetURL}',
                resetURL
            ),
            category: 'Password reset',
        })

        console.log('Password reset email sent successfully', response)
    } catch (error) {
        console.log(`Error sending password reset email: ${error}`)
        throw new Error(`Error sending password reset email: ${error}`)
    }
}

// Send success password reset email
export const sendSuccessResetPasswordEmail = async (email) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Successful',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password reset success',
        })

        console.log('Password reset success email sent successfully', response)
    } catch (error) {
        console.log(`Error sending password reset success email: ${error}`)
        throw new Error(`Error sending password reset success email: ${error}`)
    }
}
