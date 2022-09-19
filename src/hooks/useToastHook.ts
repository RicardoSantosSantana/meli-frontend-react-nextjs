import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";


export enum statusMessage {
  Warning = 'warning',
  Success = 'success', 
  Error = 'error',
  Info = 'info'
}

export function useToastHook() {

  const [state, setState] = useState();
  const toast = useToast();

  useEffect(() => {
    if (state) {
      const { message, status } = state;
      console.log(message);
      
      toast({
        title: status,
        description: message,
        status: status,
        duration: 5000,
        position: "top",
        isClosable: true,     
      });
    }
  }, [state, toast]);
 
  return [state, setState];
}
 