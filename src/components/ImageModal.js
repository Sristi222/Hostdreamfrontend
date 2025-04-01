"use client"

import { useEffect } from "react"

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose()
    }
    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  if (!image) return null

  return (
    <div className="modal" onClick={onClose}>
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <img className="modal-content" src={image.src || "/placeholder.svg"} alt={image.title} />
    </div>
  )
}

export default ImageModal

