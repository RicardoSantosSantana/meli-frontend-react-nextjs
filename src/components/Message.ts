import { Toast, useToast } from '@chakra-ui/react';

export enum statusMessage {
    Warning = 'warning',
    Success = 'success', 
    Error = 'error',
    Info = 'info'
}

export default function showMessage(title:string, message:string, status:statusMessage) {
    const toast = useToast()

    Toast({
      title: title,
      description: message,
      status: status,
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
    
} 