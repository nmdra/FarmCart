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
    const loginUrl = `http://localhost:5000/driver/login`

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: driver.email,
        subject: 'Approval Confirmation',
        html: `
        <p>Dear ${driver.fullName},</p>
        <p>Congratulations! Your driver registration has been approved. Please click the button below to log in and complete your registration:</p>
        <a href="${loginUrl}" style="
            background-color: #4CAF50; 
            color: white; 
            padding: 10px 20px; 
            text-align: center; 
            text-decoration: none; 
            display: inline-block; 
            border-radius: 5px;">
            Click Here to Log In
        </a>
        <p>Alternatively, you can enter your ID to log in for the first time.</p>
        <p>Regards,<br/>FarmCart Team</p>
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
