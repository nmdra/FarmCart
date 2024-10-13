import SupportTicket from '../../models/Help/supportTicket.model.js'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'

// Create a new support ticket
export const createTicket = async (req, res) => {
    try {
        const ticket = new SupportTicket(req.body)
        await ticket.save()
        res.status(201).json({
            message: 'Support ticket created successfully!',
            ticket,
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error creating ticket',
            error: error.message,
        })
    }
}

// Get all support tickets
export const getTickets = async (req, res) => {
    try {
        const tickets = await SupportTicket.find() // Fetch all tickets from the database
        res.status(200).json(tickets)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching tickets',
            error: error.message,
        })
    }
}

// Get a ticket by ID
export const getTicketById = async (req, res) => {
    try {
        const ticket = await SupportTicket.findById(req.params.id)
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' })
        }
        res.status(200).json(ticket)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching ticket',
            error: error.message,
        })
    }
}

// Delete a ticket
export const deleteTicket = async (req, res) => {
    try {
        const ticket = await SupportTicket.findByIdAndDelete(req.params.id)
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' })
        }
        res.status(200).json({ message: 'Ticket deleted successfully!' })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting ticket',
            error: error.message,
        })
    }
}

// Generate and send PDF for a specific ticket
export const generateTicketReport = async (req, res) => {
    const { ticketId } = req.params

    try {
        const ticket = await SupportTicket.findById(ticketId)
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' })
        }

        // Ensure the 'tickets' directory exists
        const ticketsDir = path.resolve('./tickets')
        if (!fs.existsSync(ticketsDir)) {
            fs.mkdirSync(ticketsDir)
        }

        // Create a new PDF document
        const doc = new PDFDocument()

        // Path where the PDF will be saved
        const filePath = path.join(ticketsDir, `ticket-${ticketId}.pdf`)
        const writeStream = fs.createWriteStream(filePath)
        doc.pipe(writeStream) // Save the PDF to disk

        // Add ticket information to the PDF
        doc.fontSize(25).text('Ticket Report', { align: 'center' })
        doc.moveDown()
        doc.fontSize(14).text(`Ticket ID: ${ticket._id}`)
        doc.text(`Title: ${ticket.title}`)
        doc.text(`Description: ${ticket.description}`)
        doc.text(`Status: ${ticket.status}`)
        doc.text(
            `Date Created: ${new Date(ticket.createdAt).toLocaleDateString()}`
        )

        // Finalize the PDF and end the document
        doc.end()

        // Send the PDF after it's fully written
        writeStream.on('finish', () => {
            res.download(filePath, (err) => {
                if (err) {
                    console.error('Error downloading PDF:', err)
                    return res
                        .status(500)
                        .json({ message: 'Error downloading PDF' })
                }
            })
        })
    } catch (error) {
        console.error('Error generating ticket report:', error)
        res.status(500).json({
            message: 'Error generating ticket report',
            error: error.message,
        })
    }
}

// Optionally, you can add more controller functions here
