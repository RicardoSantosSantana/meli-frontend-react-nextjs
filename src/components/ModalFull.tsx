import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { NextPage } from "next";

interface Props {
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
    children:any;    
    size:string;
}

const ModalFull: NextPage<Props> = ({ onOpen, onClose, isOpen,children,size}) => {
    return (
        
        <Modal onClose={onClose} size={size} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Detalhes do Produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalFull