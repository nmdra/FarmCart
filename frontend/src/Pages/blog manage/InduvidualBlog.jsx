import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import jsPDF from 'jspdf'
// import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Home/Footer'
import logo from '../../assets/logo/logo.png' // Your logo path

export default function IndividualBlog() {
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({ name: '', comment: '' })
    // Variables to handle speech synthesis state
    let speechUtterance = null
    useEffect(() => {
        if (!id) return

        // Fetch blog data
        axios
            .get(`/api/Blog/get/${id}`)
            .then((res) => {
                setBlog(res.data)
            })
            .catch((err) => console.log(err))

        // Fetch comments for this blog post
        axios
            .get(`/api/comments/${id}`)
            .then((res) => setComments(res.data))
            .catch((err) => console.log(err))
    }, [id])

    // Handle form input change
    const handleInputChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value })
    }

    // Handle comment form submit
    const handleSubmitComment = (e) => {
        e.preventDefault()
        axios
            .post('/api/comments/add', {
                blogId: id,
                ...newComment,
            })
            .then((res) => {
                setComments([res.data, ...comments])
                setNewComment({ name: '', comment: '' }) // Clear the form after submission
            })
            .catch((err) => console.log(err))
    }

    // Function to download PDF
    const downloadPDF = () => {
        const doc = new jsPDF()

        // Load the logo image
        const logoImg = new Image()
        logoImg.src = logo

        // Ensure the logo is loaded before generating the PDF
        logoImg.onload = () => {
            // Center the logo
            const pageWidth = doc.internal.pageSize.getWidth()
            const logoWidth = 40
            const logoX = (pageWidth - logoWidth) / 2
            doc.addImage(logoImg, 'PNG', logoX, 10, logoWidth, 10) // Centered logo

            // Add company details below the logo, centered
            doc.setFontSize(12)
            doc.text(
                'FarmCart Lanka (PVT.) LTD',
                pageWidth / 2,
                35,
                null,
                null,
                'center'
            )
            doc.text(
                'No.78, Malabe, Colombo',
                pageWidth / 2,
                40,
                null,
                null,
                'center'
            )
            doc.text(
                'Phone: (+94) 011 34 56 837',
                pageWidth / 2,
                45,
                null,
                null,
                'center'
            )
            doc.text(
                'Website: www.farmcart.com',
                pageWidth / 2,
                50,
                null,
                null,
                'center'
            )

            // Add blog title below the company details, centered and bold
            doc.setFontSize(22)
            doc.setFont('helvetica', 'bold') // Make the title bold
            doc.text(blog.title, pageWidth / 2, 70, null, null, 'center')

            // Reset the font style to normal for the rest of the content
            doc.setFont('helvetica', 'normal')

            // Add blog author and date information below the title, left-aligned
            doc.setFontSize(12)
            doc.text(`By: ${blog.author}`, 10, 80)
            doc.text(
                `Date: ${new Date(blog.createdAt).toLocaleDateString()}`,
                10,
                85
            )

            // Add blog content
            if (blog.newsImage) {
                const imageUrl = blog.newsImage
                const blogImg = new Image()
                blogImg.src = imageUrl

                blogImg.onload = () => {
                    doc.addImage(blogImg, 'JPEG', 10, 90, 180, 100) // Blog image
                    addContentToPDF(doc, blog.content, blog.title) // Function to add the blog content
                }

                blogImg.onerror = () => {
                    console.error('Failed to load blog image')
                    addContentToPDF(doc, blog.content, blog.title) // Save PDF without image
                }
            } else {
                addContentToPDF(doc, blog.content, blog.title) // Add content without image
            }
        }

        logoImg.onerror = () => {
            console.error('Failed to load logo image')
        }
    }

    const addContentToPDF = (doc, content, title) => {
        let yPosition = 200 // Starting position for content
        doc.setFontSize(10)

        yPosition += 10 // Move down after header

        // Split content into lines that fit within the page width
        const contentLines = doc.splitTextToSize(content, 180)

        // Manually justify content by adjusting spaces between words
        contentLines.forEach((line) => {
            if (yPosition > 280) {
                doc.addPage()
                yPosition = 10 // Reset Y position for new page
                doc.text(title, 10, 10) // Title on new page

                yPosition = 30 // Reset position for content
            }
            doc.text(line, 10, yPosition) // Add line to PDF
            yPosition += 10 // Move down for next line
        })

        doc.save(`${title}`.pdf) // Save the PDF
    }
    // Function to handle document download
    const handleDownloadDocument = () => {
        const downloadUrl = `/BlogDocuments/${blog.document}` // Assuming document field holds the filename
        window.open(downloadUrl, '_blank') // Open the document URL
    }
    // Function to generate speech from blog content
    const speakBlogContent = () => {
        if ('speechSynthesis' in window) {
            if (speechSynthesis.speaking && !speechSynthesis.paused) {
                // If already speaking, pause the speech
                speechSynthesis.pause()
            } else if (speechSynthesis.paused) {
                // If speech is paused, resume it
                speechSynthesis.resume()
            } else {
                // If not speaking, start the speech
                speechUtterance = new SpeechSynthesisUtterance(blog.content)
                speechUtterance.lang = 'en-US' // You can set the language here
                speechSynthesis.speak(speechUtterance)
            }
        } else {
            alert('Your browser does not support text-to-speech functionality.')
        }
    }

    // Function to stop the speech
    const stopSpeech = () => {
        if ('speechSynthesis' in window && speechSynthesis.speaking) {
            speechSynthesis.cancel()
        }
    }
    return (
        <div>
            {/* <Navbar /> */}
            <div className="max-w-3xl px-4 pt-20 mx-auto mt-6 md:mt-10">
                <h1 className="mb-8 text-4xl font-bold text-center">
                    {blog.title}
                </h1>

                <div className="mb-8 text-center">
                    <p className="text-lg text-gray-600">
                        By <span className="font-semibold">{blog.author}</span>{' '}
                        |{new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                </div>

                {blog.newsImage && (
                    <img
                        src={blog.newsImage.replace(/\.\w+$/, '.webp')}
                        alt={blog.title}
                        className="object-cover w-full h-auto mb-8 rounded-lg shadow-lg"
                    />
                )}

                <div className="p-6 mb-8 bg-gray-100 rounded-lg shadow-lg">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {blog.content}
                    </p>
                </div>

                {/* Document Download Button */}
                {blog.document && (
                    <div className="mb-4 text-center">
                        <button
                            onClick={handleDownloadDocument}
                            className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Download Document
                        </button>
                    </div>
                )}

                <div className="mb-4 text-center">
                    <button
                        className="px-6 py-3 font-bold text-white transition duration-300 ease-in-out transform rounded-lg shadow-lg bg-lime-500 hover:bg-lime-600 hover:scale-105"
                        onClick={downloadPDF}
                    >
                        Download Blog as PDF
                    </button>
                </div>
                <div className="mb-4 text-center">
                    <button
                        onClick={speakBlogContent}
                        className="px-6 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        {speechSynthesis.speaking && !speechSynthesis.paused
                            ? 'Pause Reading'
                            : 'Read Blog Aloud'}
                    </button>
                    <button
                        onClick={stopSpeech}
                        className="px-6 py-3 ml-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Stop Reading
                    </button>
                </div>
                {/* Comment Form */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold">
                        Leave a Comment
                    </h2>
                    <form onSubmit={handleSubmitComment}>
                        <input
                            type="text"
                            name="name"
                            value={newComment.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            className="w-full p-2 mb-4 border rounded"
                            required
                        />
                        <textarea
                            name="comment"
                            value={newComment.comment}
                            onChange={handleInputChange}
                            placeholder="Your Comment"
                            className="w-full p-2 mb-4 border rounded"
                            required
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-white rounded-lg bg-lime-500 hover:bg-lime-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Comments Section */}
                <div>
                    <h2 className="mb-4 text-2xl font-semibold">Comments</h2>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="p-4 mb-4 bg-gray-200 rounded-lg"
                            >
                                <p>
                                    <strong>{comment.name}</strong> said:
                                </p>
                                <p>{comment.comment}</p>
                                <p className="text-sm text-gray-600">
                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
