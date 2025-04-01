import React from 'react';

const sampleProducts = {
  paints: {
    interior: [
      { id: 1, title: "Premium Interior Emulsion", description: "High-quality interior wall paint", price: "₹450/L", image: "/placeholder.svg" },
      { id: 2, title: "Luxury Matt Finish", description: "Premium matt finish interior paint", price: "₹550/L", image: "/placeholder.svg" },
    ],
    exterior: [
      { id: 3, title: "Weather Shield Exterior", description: "Weather-resistant exterior wall paint", price: "₹500/L", image: "/placeholder.svg" },
      { id: 4, title: "All-Weather Protection", description: "Durable exterior paint with anti-fungal properties", price: "₹600/L", image: "/placeholder.svg" },
    ],
  },
  distemper: {
    acrylic: [
      { id: 5, title: "Acrylic Distemper", description: "Economic wall finish with good coverage", price: "₹200/L", image: "/placeholder.svg" },
    ],
    synthetic: [
      { id: 6, title: "Synthetic Distemper", description: "Durable synthetic wall finish", price: "₹250/L", image: "/placeholder.svg" },
    ],
  },
  "pu-polish": {
    glossy: [
      { id: 7, title: "High Gloss PU Polish", description: "Premium glossy finish for wood", price: "₹750/L", image: "/placeholder.svg" },
    ],
    matte: [
      { id: 8, title: "Matte PU Polish", description: "Sophisticated matte finish for wood", price: "₹700/L", image: "/placeholder.svg" },
    ],
  },
};

const ProductGrid = ({ mainCategory, subCategory, openModal }) => {
  const getFilteredProducts = () => {
    if (mainCategory === "all") {
      return Object.values(sampleProducts).flatMap((category) => Object.values(category).flat());
    }

    if (subCategory) {
      return sampleProducts[mainCategory]?.[subCategory] || [];
    }

    return Object.values(sampleProducts[mainCategory] || {}).flat();
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="products-grid">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-image" />
            <button className="view-btn" onClick={() => openModal(product)}>
              Quick View
            </button>
          </div>
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
