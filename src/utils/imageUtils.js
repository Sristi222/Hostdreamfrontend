/**
 * Preloads product images in the background
 * @param {Array} products - Array of product objects with imageUrl property
 */
export const preloadProductImages = (products) => {
  if (!products || !Array.isArray(products)) return

  // Use a small delay to not block the main thread
  setTimeout(() => {
    products.forEach((product) => {
      if (product.imageUrl) {
        const img = new Image()
        // Handle both relative and absolute URLs
        const fullImageUrl = product.imageUrl.startsWith("http")
          ? product.imageUrl
          : `https://hostdreambackend.onrender.com${product.imageUrl}`

        img.src = fullImageUrl
      }
    })
  }, 300)
}

