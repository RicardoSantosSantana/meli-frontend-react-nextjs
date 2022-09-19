import { AlertIcon, Button, Divider, Heading, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { NextPage } from "next";
import { MdCheckCircle } from "react-icons/md";


export type data = {
    title: string;
    message: string;
}

interface Props {
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
    message: data[];
    size: string;
}

const Alert: NextPage<Props> = ({ onOpen, onClose, isOpen, message, size }) => {

    const printData = () => {
        return (
            <List spacing={3}>
                {

                    message.map((dat, index) => {
                        return (<div key={dat.title + index}>
                        <ListItem >
                        <Heading as='h5' size='sm' pb={2} color='orange.500' >
                                {dat.title.toString().toUpperCase()}
                        </Heading>
                        <ListIcon as={MdCheckCircle} color='orange.500' />{dat.message}</ListItem>
                        <Divider pb="2"/>
                        </div>
                        )
                    })
                }
            </List>
        )
    }
    return (

        <Modal onClose={onClose} size={size} isOpen={isOpen} blockScrollOnMount={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Alert</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {printData()}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Alert