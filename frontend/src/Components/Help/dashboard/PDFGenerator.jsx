// PDFGenerator.js
import { useRef } from 'react'
import html2pdf from 'html2pdf.js'
import PropTypes from 'prop-types' // Import PropTypes

const PDFGenerator = ({ title, logoSrc, children, additionalInfo }) => {
    const pdfRef = useRef()

    const generatePDF = async () => {
        const options = {
            margin: 0.5,
            filename: `${title}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        }
        await html2pdf().set(options).from(pdfRef.current).save()
    }

    return (
        <div
            className="px-10 py-10 mx-auto overflow-x-auto text-xs border rounded-lg max-w-7xl"
            ref={pdfRef}
        >
            {/* Generate PDF Button */}
            <div
                className="flex justify-end mt-4 text-xl"
                data-html2canvas-ignore
            >
                <button
                    onClick={generatePDF}
                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-indigo-700"
                >
                    Generate PDF
                </button>
            </div>
            {logoSrc && (
                <img src={logoSrc} alt="Logo" className="w-[300px] h-auto" />
            )}
            {/* Title and Additional Info */}
            {title && (
                <div className="items-end pb-10 text-end">
                    <h2 className="text-lg font-bold">{title}</h2>
                    {additionalInfo && (
                        <div>
                            {additionalInfo.map((info, index) => (
                                <p key={index}>{info}</p>
                            ))}
                        </div>
                    )}
                    <hr className="my-4" />
                </div>
            )}
            {/* Children Elements */}
            <div>{children}</div>
        </div>
    )
}

// Add PropTypes for validation
PDFGenerator.propTypes = {
    title: PropTypes.string.isRequired, // 'title' is required and must be a string
    logoSrc: PropTypes.string, // 'logoSrc' is optional and must be a string
    children: PropTypes.node.isRequired, // 'children' must be a React node
    additionalInfo: PropTypes.arrayOf(PropTypes.string), // 'additionalInfo' is an array of strings, optional
}

export default PDFGenerator
