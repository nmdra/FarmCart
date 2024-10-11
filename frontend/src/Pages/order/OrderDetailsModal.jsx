import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react'
import PropTypes from 'prop-types'

const OrderDetailsModal = ({ isOpen, onOpenChange, clickOrder }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="rounded-xl shadow-lg"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        {/* Order modal Header */}
                        <ModalHeader className="flex flex-col gap-1 text-center">
                            <h4 className="text-xl font-bold text-gray-800">
                                Order Details
                            </h4>
                        </ModalHeader>

                        {/* Oeder modal Body */}
                        <ModalBody>
                            <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-lg shadow-sm">
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-900">
                                        Order Items:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.orderItems
                                            .map((p) => p.name)
                                            .join(', ')}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-900">
                                        Name:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.shippingAddress.name}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-900">
                                        City:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.shippingAddress.city}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-900">
                                        Phone Number:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.shippingAddress.phone}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-900">
                                        Email:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder?.shippingAddress?.email}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-900">
                                        Shipping Address:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.shippingAddress.address}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-900">
                                        Payment Method:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        Card Payment
                                    </span>
                                </div>
                                {/* Total Price Section */}
                                <div className="text-lg font-bold mt-4">
                                    Total Price: LKR{' '}
                                    <span className="text-green-600">
                                        {clickOrder.totalPrice.toLocaleString(
                                            'en-US',
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </span>
                                </div>
                            </div>
                        </ModalBody>

                        {/* Modal Footer with a Close Button */}
                        <ModalFooter className="justify-end">
                            <Button
                                color="success"
                                onPress={onClose}
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

OrderDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    clickOrder: PropTypes.object.isRequired,
}

export default OrderDetailsModal
