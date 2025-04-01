"use client"

import { useState, useEffect } from "react"
import "./ProductImage.css"

const ProductImage = ({ product, alt, className = "", onLoad, onError }) => {
  const [imageSrc, setImageSrc] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!product || !product.imageUrl) {
      setHasError(true)
      setIsLoading(false)
      if (onError) onError(product?._id)
      return
    }

    // Handle both Cloudinary URLs and local URLs
    // Cloudinary URLs start with http/https
    const fullImageUrl = product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `https://hostdreambackend.onrender.com${product.imageUrl}`

    setImageSrc(fullImageUrl)

    // Preload the image to check if it exists
    const img = new Image()
    img.src = fullImageUrl

    img.onload = () => {
      setIsLoading(false)
      setHasError(false)
      if (onLoad) onLoad(product._id)
    }

    img.onerror = () => {
      console.error(`Failed to load image: ${fullImageUrl}`)
      setIsLoading(false)
      setHasError(true)
      if (onError) onError(product._id)
    }
  }, [product, onLoad, onError])

  if (isLoading) {
    return (
      <div className={`image-placeholder ${className}`}>
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={`image-error ${className}`}>
        <span>Image not available</span>
      </div>
    )
  }

  // Apply proper styling to maintain aspect ratio and prevent stretching
  const imageStyle = {
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  }

  // Determine if this is a modal image based on className
  const isModalImage = className && className.includes("modal-image")

  // Add specific styles for modal images
  if (isModalImage) {
    imageStyle.maxHeight = "220px"
  }

  return (
    <img
      src={imageSrc || "/placeholder.svg"}
      alt={alt || "Product"}
      className={`product-image ${className}`}
      style={imageStyle}
    />
  )
}

export default ProductImage

