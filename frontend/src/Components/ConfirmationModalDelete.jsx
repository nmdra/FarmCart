import React from 'react'

const ConfirmationModalDelete = ({
    isOpen,
    onClose,
    onConfirm,
    confirmationText,
    setConfirmationText,
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
                <h2 className="text-xl font-semibold mb-4">
                    Confirm Account Deletion
                </h2>
                <p>
                    Type <strong>"I want to delete my account"</strong> to
                    confirm:
                </p>
                <input
                    type="text"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white font-bold py-1 px-3 rounded"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModalDelete
