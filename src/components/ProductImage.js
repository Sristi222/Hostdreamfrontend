"use client"

import { useState, useEffect } from "react"
import "./ProductImage.css"

const ProductImage = ({ product, alt, className = "", onLoad, onError }) => {
  const [imageSrc, setImageSrc] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorDetails, setErrorDetails] = useState("")
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!product || !product.imageUrl) {
      console.error("Product or imageUrl is missing:", product)
      setHasError(true)
      setErrorDetails("Missing image URL")
      setIsLoading(false)
      if (onError) onError(product?._id)
      return
    }

    // Construct the full image URL
    const fullImageUrl = product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `https://dreamhousebackend-vvxx.onrender.com${product.imageUrl}`

    // Enforce HTTPS
    const secureImageUrl = fullImageUrl.replace("http://", "https://")

    console.log(`Loading image for ${product.name}: ${secureImageUrl}`)
    setImageSrc(secureImageUrl)

    const img = new Image()
    img.src = secureImageUrl

    img.onload = () => {
      console.log(`Successfully loaded image: ${secureImageUrl}`)
      setIsLoading(false)
      setHasError(false)
      if (onLoad) onLoad(product._id)
    }

    img.onerror = () => {
      console.error(`Failed to load image: ${secureImageUrl}`)

      if (secureImageUrl.includes("cloudinary.com")) {
        console.error(
          `Cloudinary image failed to load. Product ID: ${product._id}, Name: ${product.name}`
        )

        try {
          const urlParts = secureImageUrl.split("/")
          const uploadIndex = urlParts.findIndex((part) => part === "upload")
          if (uploadIndex !== -1 && urlParts.length > uploadIndex + 1) {
            const publicIdWithVersion = urlParts.slice(uploadIndex + 1).join("/")
            console.error(`Possible Cloudinary public ID: ${publicIdWithVersion}`)
          }
        } catch (e) {
          console.error("Error parsing Cloudinary URL:", e)
        }
      }

      setIsLoading(false)
      setHasError(true)
      setErrorDetails(`Failed to load: ${secureImageUrl}`)

      // Retry up to 3 times
      if (retryCount < 3) {
        const timeout = Math.pow(2, retryCount) * 1000
        console.log(`Retrying image load (attempt ${retryCount + 1}) in ${timeout}ms`)

        setTimeout(() => {
          setRetryCount((prev) => prev + 1)
          setIsLoading(true)
          setHasError(false)
        }, timeout)
      } else if (onError) {
        onError(product._id)
      }
    }
  }, [product, onLoad, onError, retryCount])

  if (isLoading) {
    return (
      <div className={`image-placeholder ${className}`}>
        <div className="loading-spinner"></div>
        {retryCount > 0 && <div className="retry-text">Retrying... ({retryCount}/3)</div>}
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={`image-error ${className}`}>
        <span>Image not available</span>
        {process.env.NODE_ENV === "development" && (
          <div className="error-details">{errorDetails}</div>
        )}
      </div>
    )
  }

  const isCardImage = !className || !className.includes("modal-image")
  const isModalImage = className && className.includes("modal-image")

  const imageStyle = {
    width: "auto",
    height: "auto",
    maxWidth: isCardImage ? "100%" : "65%",
    maxHeight: isModalImage ? "220px" : "100%",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  }

  return (
    <div className={`product-image-wrapper ${isCardImage ? "card-image-wrapper" : ""}`}>
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={alt || "Product"}
        className={`product-image ${className}`}
        style={imageStyle}
        onError={(e) => {
          console.error("Runtime error loading image:", imageSrc)
          setHasError(true)
          setErrorDetails(`Runtime error loading: ${imageSrc}`)
          if (onError) onError(product?._id)
        }}
      />
    </div>
  )
}

export default ProductImage
