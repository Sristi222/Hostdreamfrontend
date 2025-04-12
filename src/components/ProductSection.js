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

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root") || document.body)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://dreamhousebackend-vvxx.onrender.com/api/products")
        const productsData = response.data || []
        setProducts(productsData.slice(0, 6)) // only show 6 products
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

  const handleImageLoad = (productId) => {
    setLoadedImages((prev) => ({ ...prev, [productId]: true }))
  }

  const handleImageError = (productId) => {
    setLoadedImages((prev) => ({ ...prev, [productId]: "error" }))
  }



  const renderModal = () => {
    if (!modalProduct || !isModalVisible || !modalRoot) return null
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
        }}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#fff",
            padding: "28px",
            borderRadius: "12px",
            width: "380px",
            maxHeight: "85vh",
            overflow: "auto",
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
          <div style={{ height: "220px", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <ProductImage
              product={modalProduct}
              alt={modalProduct.name}
              className="modal-image"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
          <h2 style={{ fontSize: "1.4rem", textAlign: "center" }}>{modalProduct.name || "Product"}</h2>
          <p style={{ textAlign: "center", color: "#555" }}>{modalProduct.description || "No description available"}</p>
        </div>
      </div>,
      modalRoot
    )
  }

  return (
    <>
      <section className="products">
        <div className="container">
          <h2 className="section-title">Our Products</h2>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
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
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="view-all-container">
            <Link to="/products" className="view-all-btn">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {renderModal()}
    </>
  )
}

export default ProductSection
