"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { createPortal } from "react-dom"
import "./ProductSection.css"
import ProductImage from "./ProductImage"

const ProductSection = ({ mainCategories, subCategories }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalProduct, setModalProduct] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loadedImages, setLoadedImages] = useState({})
  const modalRef = useRef(null)
  const [modalRoot, setModalRoot] = useState(null)

  // Find the modal root element after component mounts
  useEffect(() => {
    setModalRoot(document.getElementById("modal-root") || document.body)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://dreamhousebackend-vvxx.onrender.com/api/products")
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalVisible) {
        closeModal()
      }
    }

    if (isModalVisible) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      if (!isModalVisible) {
        document.body.style.overflow = ""
      }
    }
  }, [isModalVisible])

  const openModal = (product, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    console.log("Opening modal for product:", product)
    setModalProduct(product)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("closing")

      setTimeout(() => {
        setIsModalVisible(false)
        document.body.style.overflow = "visible"

        setTimeout(() => {
          if (modalRef.current) {
            modalRef.current.classList.remove("closing")
          }
          setModalProduct(null)
        }, 50)
      }, 300)
    } else {
      setIsModalVisible(false)
      document.body.style.overflow = "visible"
      setTimeout(() => setModalProduct(null), 300)
    }
  }

  // Track image load status
  const handleImageLoad = (productId) => {
    setLoadedImages((prev) => ({
      ...prev,
      [productId]: true,
    }))
  }

  // Track image error status
  const handleImageError = (productId) => {
    setLoadedImages((prev) => ({
      ...prev,
      [productId]: "error",
    }))
  }

  

  // Render modal using portal
  const renderModal = () => {
    if (!modalProduct || !isModalVisible || !modalRoot) {
      return null
    }

    // Use createPortal to render the modal at the root level
    return createPortal(
      <div
        ref={modalRef}
        className={`modal ${isModalVisible ? "show" : ""}`}
        onClick={closeModal}
        style={{
          position: "fixed",
          zIndex: 9999,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1,
          visibility: "visible",
        }}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#ffffff",
            padding: "28px",
            borderRadius: "12px",
            width: "380px",
            maxWidth: "90%",
            maxHeight: "85vh",
            overflow: "auto",
            opacity: 1,
            transform: "scale(1)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            position: "relative",
          }}
        >
          <span
            className="close"
            onClick={closeModal}
            style={{
              position: "absolute",
              right: "12px",
              top: "12px",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
            }}
          >
            &times;
          </span>

          {/* Image container using the improved ProductImage component */}
          <div
            style={{
              width: "100%",
              height: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <ProductImage
              product={modalProduct}
              alt={modalProduct.name}
              className="modal-image"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>

          <h2
            style={{
              fontSize: "1.4rem",
              marginBottom: "14px",
              fontWeight: "600",
              color: "#111",
              lineHeight: "1.2",
              textAlign: "center",
              width: "100%",
            }}
          >
            {modalProduct.name || "Product"}
          </h2>

          <p
            style={{
              marginBottom: "18px",
              lineHeight: "1.5",
              color: "#555",
              fontSize: "1rem",
              textAlign: "center",
              width: "100%",
            }}
          >
            {modalProduct.description || "No description available"}
          </p>

          {modalProduct.sizes && modalProduct.sizes.length > 0 && (
            <div
              style={{
                marginTop: "16px",
                fontSize: "0.95rem",
                color: "#333",
                lineHeight: "1.5",
                padding: "12px",
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <p style={{ margin: 0 }}>
                Available sizes:{" "}
                {Array.isArray(modalProduct.sizes) ? modalProduct.sizes.join(", ") : modalProduct.sizes}
                {modalProduct.sizeUnit ? ` ${modalProduct.sizeUnit}` : ""}
              </p>
            </div>
          )}
        </div>
      </div>,
      modalRoot,
    )
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
    <>
      <section className="products">
        <div className="container">
          <h2 className="section-title">Our Products</h2>

          <div className="products-grid">
            {products.slice(0, 6).map((product) => (
              <div key={product._id} className="product-card">
                

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
      </section>

      {/* Render modal using portal */}
      {renderModal()}
    </>
  )
}

export default ProductSection
