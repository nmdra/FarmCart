import React from 'react';
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import farmcartLogo from '../../assets/logo.png'

const DownloadReceipt = ({ order }) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const generatePDF = () => {
        const props = {
            outputType: OutputType.Save,
            returnJsPDFDocObject: true,
            fileName: `Invoice_${order._id}`,
            orientationLandscape: false,
            compress: true,
            logo: {
                src: farmcartLogo,
                type: 'PNG',
                width: 72,
                height: 12,
                margin: {
                    top: 0,
                    left: 0
                }
            },
            stamp: {
                inAllPages: true,
                src: "https://cdn.me-qr.com/qr/127374536.png?v=1727191883",
                type: 'PNG',
                width: 20,
                height: 20,
                margin: {
                    top: 0,
                    left: 0
                }
            },
            business: {
                name: "FarmCart Lanka (PVT.) LTD",
                address: "No.78, Malabe, Colombo",
                phone: "(+94) 011 34 56 837",
                email: "contact@farmcart.com",
                website: "www.farmcart.com",
            },
            contact: {
                label: "Invoice issued for:",
                name: user.firstname + " " + user.lastname,
                address: `${user.defaultAddress.streetAddress}, ${user.defaultAddress.city}, ${user.defaultAddress.city}, ${user.defaultAddress.zipCode}`,
                phone: order.shippingAddress.phone,
            },
            invoice: {
                label: "Invoice #: ",
                num: order._id.slice(-12),
                invDate: `Payment Date: ${new Date(order.createdAt).toLocaleDateString()}`,
                invGenDate: `Invoice Date: ${new Date().toLocaleDateString()}`,
                headerBorder: true,
                tableBodyBorder: true,
                header: [
                    { title: "#", style: { width: 10 } },
                    { title: "Title", style: { width: 30 } },
                    { title: "Price" },
                    { title: "Quantity" },
                    { title: "Unit" },
                    { title: "Total" }
                ],
                table: order.orderItems.map((item, index) => [
                    index + 1,
                    item.name,
                    item.price.toFixed(2),
                    item.quantity,
                    "pcs", // Adjust unit as needed
                    (item.price * item.quantity).toFixed(2)
                ]),
                additionalRows: [{
                    col1: 'Total:',
                    col2: `Rs.${order.totalPrice.toFixed(2)}`,
                    style: { fontSize: 14 }
                }],
                invDescLabel: "Invoice Note",
                invDesc: "Thank you for your order!",
            },
            footer: {
                text: "The invoice is created on a computer and is valid without the signature and stamp.",
            },
            pageEnable: true,
            pageLabel: "Page ",
        };

        // Create PDF and get the created PDF object
        const pdfCreated = jsPDFInvoiceTemplate(props);
        
        // Optional: Add additional pages or content
        // pdfCreated.jsPDFDocObject.addPage();
        // pdfCreated.jsPDFDocObject.text("Additional text", 10, 50);

        // Save the created PDF
        pdfCreated.jsPDFDocObject.save();
    };

    return (
        <button
            onClick={generatePDF}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300"
        >
            Download Receipt
        </button>
    );
};

export default DownloadReceipt;
