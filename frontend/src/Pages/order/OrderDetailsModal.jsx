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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h4>Order Details</h4>
                        </ModalHeader>
                        <ModalBody>
                            <div className="max-w-lg mx-auto bg-white  p-6">
                                <div className="mb-2">
                                    <span className="font-medium">
                                        Order Items:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.orderItems
                                            .map((p) => p.name)
                                            .join(', ')}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium">Name:</span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.shippingAddress.name}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium">City:</span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.shippingAddress.city}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium">
                                        Phone Number:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.shippingAddress.phone}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium">Email:</span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder?.shippingAddress?.email}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium">
                                        Shipping Address:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        {clickOrder.shippingAddress.address}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium">
                                        Payment Method:
                                    </span>{' '}
                                    <span className="text-gray-700">
                                        Card Payment
                                    </span>
                                </div>
                                <div className="text-lg font-semibold mt-4">
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
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
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
