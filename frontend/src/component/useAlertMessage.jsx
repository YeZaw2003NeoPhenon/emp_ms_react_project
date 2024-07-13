import { useState } from "react"
export const useAlertMessage = () => {
    const[alertMessage , setAlertMessage ] = useState('')
    const[alertVariant , setALertVariant] = useState('success')

    const showAlertMessage = (message , variant) => {
        setAlertMessage(message)
        setALertVariant(variant)
      
      setTimeout(() => {
          setAlertMessage('');
        }, 1000); 
        
      }

      return({alertMessage , alertVariant , showAlertMessage})
}