import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModalDelete'; // Import the modal component

const DeleteAccountButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        if (confirmationText !== 'I want to delete my account') {
            toast.error('Please type "I want to delete my account" to confirm.');
            return;
        }

        try {
            const response = await axios.delete('/api/users'); // Adjust the endpoint as necessary
            toast.success(response.data.message);
            
            // Redirect to the registration page after deletion
            navigate('/register'); // Adjust the path as necessary
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete account');
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
            >
                Delete Account
            </button>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteAccount}
                confirmationText={confirmationText}
                setConfirmationText={setConfirmationText}
            />
        </div>
    );
};

export default DeleteAccountButton;
