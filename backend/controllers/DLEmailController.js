// controllers/DLEmailController.js
import 'dotenv/config'
import { log } from 'node:console'
import { createTransport } from 'nodemailer'

import nodemailer from 'nodemailer'
import asyncHandler from 'express-async-handler'
import DLDeliveryForm from '../models/DLDeliveryFormModel.js'

export const sendApprovalEmail = asyncHandler(async (req, res) => {
    const driverId = req.params.id

    // Fetch the driver's details from the database
    const driver = await DLDeliveryForm.findById(driverId)

    if (!driver) {
        res.status(404)
        throw new Error('Driver not found')
    }

    // Set up the transporter using environment variables
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    // The URL for the driver to follow (this could be your site's login or another relevant page)
    const loginUrl = `/driver/login`

    // Email content
    const mailOptions = {
        from: `'FarmCart 🌱' <${process.env.EMAIL_USER}`,
        to: driver.email,
        subject: 'Farmcart: Approval Confirmation',
        html: `
         <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: 2px solid #4CAF50;">
                <h2 style="text-align: center; color: #2E7D32; font-size: 24px; font-weight: bold;">FarmCart: Approval Confirmation</h2>

                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                    Dear <strong>${driver.fullName}</strong>,
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                    Congratulations! Your driver registration has been approved.
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #333; font-weight: bold; color: #2E7D32;">
                    You can log in to your account by clicking the button below to complete your registration:
                </p>

                <div style="text-align: center; margin: 20px 0;">
                    <a href="${process.env.SITE_URL}${loginUrl}" style="
                        background-color: #4CAF50; 
                        color: white; 
                        padding: 12px 24px; 
                        text-align: center; 
                        text-decoration: none; 
                        display: inline-block; 
                        font-size: 16px; 
                        font-weight: bold; 
                        border-radius: 5px;">
                        Click Here to Log In
                    </a>
                </div>

                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                    Alternatively, you can enter your ID to log in for the first time.
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                    Regards,<br/>FarmCart Team
                </p>
            </div>
        </div>
    `,
    }

    // Send the email
    try {
        await transporter.sendMail(mailOptions)
        res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
        res.status(500)
        throw new Error('Failed to send email')
    }
})
