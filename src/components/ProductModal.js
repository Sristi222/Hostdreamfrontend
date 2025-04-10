


const ProductModal = ({ product, closeModal }) => {
  if (!product) {
    return null // Dont render anything if product is undefined
  }

  return (
    <div className="modal show" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <img src={product.image || "/placeholder.svg"} alt={product.title} className="modal-image" />
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.price}</p>
        {product.details && <div className="product-details">{product.details}</div>}
      </div>
    </div>
  )
}

export default ProductModal
