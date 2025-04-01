import { getDirectImageUrl, preloadImage } from "../utils/imageUtils"

/**
 * Service to preload and manage product images
 */
class ImageService {
  constructor() {
    this.loadedImages = new Map()
    this.failedImages = new Set()
    this.isInitialized = false
  }

  /**
   * Initialize the service by preloading all product images
   * @param {Array} products - Array of product objects
   */
  async initialize(products) {
    if (this.isInitialized) return

    console.log("Initializing image service with", products.length, "products")

    // Preload all product images in parallel
    const preloadPromises = products.map((product) => {
      if (!product.imageUrl) return Promise.resolve()

      return this.loadImage(product.imageUrl)
        .then(() => {
          console.log(`✅ Successfully preloaded image for ${product.name}`)
        })
        .catch((err) => {
          console.error(`❌ Failed to preload image for ${product.name}:`, err)
          this.failedImages.add(product.imageUrl)
        })
    })

    // Wait for all preload attempts to complete
    await Promise.allSettled(preloadPromises)

    this.isInitialized = true
    console.log("Image service initialization complete")
    console.log("Successfully loaded images:", this.loadedImages.size)
    console.log("Failed images:", this.failedImages.size)
  }

  /**
   * Load a single image and cache it if successful
   * @param {string} imageUrl - The image URL to load
   * @returns {Promise} A promise that resolves when the image is loaded
   */
  async loadImage(imageUrl) {
    if (this.loadedImages.has(imageUrl)) {
      return Promise.resolve(this.loadedImages.get(imageUrl))
    }

    if (this.failedImages.has(imageUrl)) {
      return Promise.reject(new Error(`Image previously failed to load: ${imageUrl}`))
    }

    // Generate a direct URL with timestamp to bypass cache
    const directUrl = getDirectImageUrl(imageUrl)

    try {
      const img = await preloadImage(directUrl)
      this.loadedImages.set(imageUrl, img)
      return img
    } catch (error) {
      this.failedImages.add(imageUrl)
      throw error
    }
  }

  /**
   * Get the best available URL for an image
   * @param {string} imageUrl - The image URL
   * @returns {string} The best URL to use for the image
   */
  getBestImageUrl(imageUrl) {
    if (!imageUrl) return "/placeholder.svg"

    // If we've successfully loaded this image before, use a direct URL
    if (this.loadedImages.has(imageUrl)) {
      return getDirectImageUrl(imageUrl)
    }

    // If we've tried and failed before, use placeholder
    if (this.failedImages.has(imageUrl)) {
      return "/placeholder.svg"
    }

    // Otherwise, use a direct URL with cache busting
    return getDirectImageUrl(imageUrl)
  }

  /**
   * Retry loading a previously failed image
   * @param {string} imageUrl - The image URL to retry
   * @returns {Promise} A promise that resolves when the image is loaded
   */
  async retryFailedImage(imageUrl) {
    if (this.failedImages.has(imageUrl)) {
      this.failedImages.delete(imageUrl)
      return this.loadImage(imageUrl)
    }

    return Promise.resolve()
  }
}

// Create and export a singleton instance
const imageService = new ImageService()
export default imageService

