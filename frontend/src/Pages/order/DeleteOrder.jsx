import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react'
import axios from 'axios'

import PropTypes from 'prop-types'

const DeleteOrder = ({
    isOpen,
    onOpenChange,
    orderId,
    setOrders,
    setClickOrderId,
}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h4>Delete Order</h4>
                        </ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete this order</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                color="primary"
                                disabled={!orderId}
                                onClick={async () => {
                                    if (orderId) {
                                        try {
                                            await axios.delete(
                                                `http://localhost:5000/api/orders/${orderId}`
                                            )
                                            setOrders((prevOrder) =>
                                                prevOrder.filter(
                                                    (item) =>
                                                        item._id !== orderId
                                                )
                                            )
                                            setClickOrderId(null)
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }
                                    onClose()
                                }}
                            >
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

DeleteOrder.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    orderId: PropTypes.any,
    setOrders: PropTypes.any,
    setClickOrderId: PropTypes.any,
}

export default DeleteOrder
