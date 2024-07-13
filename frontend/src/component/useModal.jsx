import { useState } from "react"
export const useModal = () => {

    const[showModal , setShowModal ] = useState(null) 
    const[selectedId , setSelectedId ] = useState(null)

    const handleShowModal = (id) => {
        setSelectedId(id)
        setShowModal(true)
      }
      
      const handleCloseModal = () => {
        setSelectedId(null)
        setShowModal(false)
      }
      return ({showModal  ,setShowModal , handleShowModal ,handleCloseModal, selectedId })
}