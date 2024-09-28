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

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: driver.email,
        subject: 'Approval Confirmation',
        text: `Dear ${driver.fullName},\n\nCongratulations! Your driver registration has been approved.Enter Your ID to login in first time . \n\nRegards,\nFarmCart Team`,
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
