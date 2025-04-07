"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "./ProductSection.css"
import ProductImage from "./ProductImage"

const ProductSection = ({ mainCategories, subCategories }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalProduct, setModalProduct] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loadedImages, setLoadedImages] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://hostdreambackend.onrender.com/api/products?limit=6")
        const productsData = response.data || []
        setProducts(productsData)
      } catch (error) {
        console.error("❌ Error fetching products:", error)
        setError("Failed to load products. Please try again later.")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const openModal = (product, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setModalProduct(product)
    setIsModalVisible(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalVisible(false)
    document.body.style.overflow = "visible"
    setTimeout(() => {
      setModalProduct(null)
    }, 300)
  }

  const handleImageLoad = (productId) => {
    setLoadedImages((prev) => ({
      ...prev,
      [productId]: true,
    }))
  }

  const handleImageError = (productId) => {
    setLoadedImages((prev) => ({
      ...prev,
      [productId]: "error",
    }))
  }

  const isBestSeller = (productId) => {
    const seed = productId
      .toString()
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return seed % 3 === 0
  }

  if (loading) {
    return (
      <section className="products">
        <div className="container">
          <h2 className="section-title">Our Products</h2>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="products">
        <div className="container">
          <h2 className="section-title">Our Products</h2>
          <p className="error-message">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="products">
      <div className="container">
        <h2 className="section-title">Our Products</h2>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              {isBestSeller(product._id) && <div className="best-seller">BEST SELLER</div>}

              <div className="product-image-container">
                <ProductImage
                  product={product}
                  alt={product.name}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />

                <button className="quick-view-btn" onClick={(e) => openModal(product, e)}>
                  Quick View
                </button>
              </div>

              <div className="product-content">
                <div className="product-availability">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 7h-9.8C9.5 7 9 7.5 9 8.2v.6c0 .7.5 1.2 1.2 1.2H20c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                    <path d="M20 14h-9.8c-.7 0-1.2.5-1.2 1.2v.6c0 .7.5 1.2 1.2 1.2H20c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                    <path d="M12 2v20"></path>
                    <path d="M4 12h8"></path>
                  </svg>
                  <span>In Stock</span>
                </div>

                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <Link to="/products" className="view-all-btn">
            View All Products
          </Link>
        </div>
      </div>

      {modalProduct && (
        <div className={`modal ${isModalVisible ? "show" : ""}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ProductImage product={modalProduct} alt={modalProduct.name} className="modal-image" />
            <h2 className="modal-product-title">{modalProduct.name}</h2>
            <p className="modal-product-description">{modalProduct.description}</p>
            {modalProduct.sizes && modalProduct.sizes.length > 0 && (
              <div className="modal-product-sizes">
                <p>
                  Available sizes: {modalProduct.sizes.join(", ")} {modalProduct.sizeUnit}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductSection
