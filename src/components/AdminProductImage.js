"use client"

import { useState, useEffect } from "react"
import "./AdminProductImage.css"

const AdminProductImage = ({ imageUrl, alt }) => {
  const [imageSrc, setImageSrc] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!imageUrl) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    // ✅ Use backticks for template string
    const fullImageUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `https://hostdreambackend.onrender.com${imageUrl}`

    setImageSrc(fullImageUrl)

    const img = new Image()
    img.src = fullImageUrl

    img.onload = () => {
      setIsLoading(false)
      setHasError(false)
    }

    img.onerror = () => {
      console.error(`❌ Failed to load image: ${fullImageUrl}`)
      setIsLoading(false)
      setHasError(true)
    }
  }, [imageUrl])

  if (isLoading) {
    return (
      <div className="admin-image-placeholder">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="admin-image-error">
        <span>No image</span>
      </div>
    )
  }

  return (
    <img
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      className="admin-product-image"
    />
  )
}

export default AdminProductImage
