import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CommentList = () => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchComments() // Fetch all comments on component mount
    }, [])

    const fetchComments = async () => {
        try {
            const response = await axios.get('/api/comments') // Fetch all comments
            setComments(response.data)
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
    }

    const deleteComment = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this comment?'
        )
        if (confirmed) {
            try {
                await axios.delete(`/api/comments/delete/${id}`)
                alert('Comment deleted successfully!')
                fetchComments() // Refresh comment list after deletion
            } catch (error) {
                console.error('Error deleting comment:', error)
                alert('Comment deletion failed.')
            }
        }
    }

    return (
        <section className="p-6 mx-auto mt-20 bg-gray-100 rounded-md shadow-md max-w-7xl dark:bg-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold text-black capitalize dark:text-black">
                    Comments List
                </h1>
            </div>

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="flex items-start p-4 bg-white rounded-md shadow-md dark:bg-white"
                    >
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-black">
                                Comment by: {comment.name}
                            </h2>
                            <p className="text-gray-600 dark:text-black">
                                {comment.comment}
                            </p>
                        </div>
                        <div className="flex items-center ml-4 space-x-4">
                            <button
                                className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                                onClick={() => deleteComment(comment._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CommentList
