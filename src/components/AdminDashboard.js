//admindashboard.js



"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Edit, Trash2, Plus, Search, ChevronUp, ChevronDown, BarChart2, Package, Users, Menu, X } from "lucide-react"
import "./AdminDashboard.css"
import AdminProductImage from "./AdminProductImage"

const mainCategories = [
  { id: "exterior", name: "Exterior" },
  { id: "interior", name: "Interior" },
  { id: "distemper", name: "Distemper" },
  { id: "wood-polish", name: "Wood Polish" },
  { id: "pu-polish", name: "PU Polish" },
  { id: "enamel", name: "Enamel" },
  { id: "primer", name: "Primer" },
  { id: "waterproofing", name: "Waterproofing" },
]

const subCategories = {
  exterior: ["Water Puffing", "Ultima Protect Shine", "Apex Ultima", "Apex", "ACE", "Silicon"],
  interior: [
    "Royal Health Shield",
    "Royal Blink",
    "Royal Aspira",
    "Royal Shine",
    "Royal Luxury",
    "Premium Emulsion",
    "Tractor Emulsion",
    "Silicon",
  ],
  distemper: ["Tractor Distemper", "Uno Distemper"],
  "wood-polish": ["Chapra", "Sealer", "Lacker", "Melamine"],
  enamel: ["Premium Gloss Enamel", "Satin Enamel"],
  primer: ["Oil Primer", "Wood Primer", "Metal Primer"],
  waterproofing: ["Damp Proof", "Hydro Lock", "Damp Shield"],
}

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [activeSection, setActiveSection] = useState("dashboard")
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    subCategory: "",
    description: "",
    image: null,
    price: "0", // Add default price
  })
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [categoryStats, setCategoryStats] = useState({})
  const [subCategoryStats, setSubCategoryStats] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchProducts()

    // Close sidebar on window resize if screen gets larger
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const sorted = [...products]
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    const filtered = sorted.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredProducts(filtered)

    // Calculate category stats
    const stats = {}
    mainCategories.forEach((category) => {
      stats[category.id] = products.filter((product) => product.category === category.id).length
    })
    setCategoryStats(stats)

    // Calculate subcategory stats
    const subStats = {}
    products.forEach((product) => {
      if (product.subCategory) {
        subStats[product.subCategory] = (subStats[product.subCategory] || 0) + 1
      }
    })
    setSubCategoryStats(subStats)
  }, [searchTerm, products, sortConfig])

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://dreamhousebackend-vvxx.onrender.com/api/products")
      setProducts(res.data)
    } catch (error) {
      console.error("❌ Error fetching products:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: type === "checkbox" ? checked : value,
      })
    } else {
      setNewProduct({
        ...newProduct,
        [name]: type === "checkbox" ? checked : value,
      })
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, image: file })
    } else {
      setNewProduct({ ...newProduct, image: file })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    const productData = editingProduct || newProduct

    // Ensure price is included in the form data
    for (const key in productData) {
      formData.append(key, productData[key])
    }

    // Make sure price is always set, even if not in the productData object
    if (!formData.has("price")) {
      formData.append("price", "0")
    }

    try {
      if (editingProduct) {
        await axios.put(https://dreamhousebackend-vvxx.onrender.com/api/products/${editingProduct._id}, formData, {
          headers: { Authorization: Bearer ${token}, "Content-Type": "multipart/form-data" },
        })
        alert("✅ Product updated successfully!")
      } else {
        await axios.post("https://dreamhousebackend-vvxx.onrender.com/api/products", formData, {
          headers: { Authorization: Bearer ${token}, "Content-Type": "multipart/form-data" },
        })
        alert("✅ Product added successfully!")
      }

      setNewProduct({
        name: "",
        category: "",
        subCategory: "",
        description: "",
        image: null,
        price: "0", // Keep default price in reset state
      })
      setEditingProduct(null)
      fetchProducts()
      setActiveSection("allProducts")

      // Close sidebar on mobile after form submission
      if (window.innerWidth <= 768) {
        setSidebarOpen(false)
      }
    } catch (error) {
      console.error("❌ Error submitting product:", error)
      alert(Error: ${error.response?.data?.message || error.message})
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      await axios.delete(https://dreamhousebackend-vvxx.onrender.com/api/products/${id}, {
        headers: { Authorization: Bearer ${token} },
      })
      alert("✅ Product deleted successfully!")
      fetchProducts()
    } catch (error) {
      console.error("❌ Error deleting product:", error)
    }
  }

  const handleEdit = (product) => {
    // Make sure price is included when editing
    const productWithPrice = {
      ...product,
      price: product.price || "0",
    }
    setEditingProduct(productWithPrice)
    setActiveSection("editProduct")

    // Close sidebar on mobile after clicking edit
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("token")
    alert("✅ You have been signed out.")
    navigate("/")
  }

  const handleSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const handleFeaturedToggle = async (id, currentFeatured) => {
    try {
      await axios.patch(
        https://dreamhousebackend-vvxx.onrender.com/api/products/${id},
        { featured: !currentFeatured },
        { headers: { Authorization: Bearer ${token} } },
      )
      fetchProducts()
    } catch (error) {
      console.error("❌ Error updating featured status:", error)
      alert("Failed to update featured status. Please try again.")
    }
  }

  const handleNavItemClick = (section) => {
    setActiveSection(section)
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="admin-container">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={sidebar ${sidebarOpen ? "open" : ""}}>
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeSection === "dashboard" ? "active" : ""} onClick={() => handleNavItemClick("dashboard")}>
            <BarChart2 size={20} />
            <span>Dashboard</span>
          </li>
          <li
            className={activeSection === "allProducts" ? "active" : ""}
            onClick={() => handleNavItemClick("allProducts")}
          >
            <Package size={20} />
            <span>Products</span>
          </li>
          <li
            className={activeSection === "addProduct" ? "active" : ""}
            onClick={() => handleNavItemClick("addProduct")}
          >
            <Plus size={20} />
            <span>Add Product</span>
          </li>
        </ul>
        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div className={content ${sidebarOpen ? "shifted" : ""}}>
        <header className="content-header">
          <h1>
            {activeSection === "dashboard"
              ? "Dashboard"
              : activeSection === "allProducts"
                ? "All Products"
                : activeSection === "editProduct"
                  ? "Edit Product"
                  : "Add Product"}
          </h1>
        </header>

        {activeSection === "dashboard" && (
          <div className="dashboard-overview">
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <div className="card-icon">
                  <Package size={24} />
                </div>
                <div className="card-info">
                  <h3>Total Products</h3>
                  <p>{products.length}</p>
                </div>
              </div>
              <div className="dashboard-card">
                <div className="card-icon">
                  <Users size={24} />
                </div>
                <div className="card-info">
                  <h3>Categories</h3>
                  <p>{Object.keys(categoryStats).length}</p>
                </div>
              </div>
            </div>

            <div className="category-breakdown">
              <h3>Category Breakdown</h3>
              <ul>
                {mainCategories.map((category) => (
                  <li key={category.id}>
                    <span>{category.name}</span>
                    <span>{categoryStats[category.id] || 0}</span>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: ${((categoryStats[category.id] || 0) / products.length) * 100}% }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="subcategory-breakdown">
              <h3>Subcategory Breakdown</h3>
              <div className="subcategory-grid">
                {Object.entries(subCategoryStats).map(([subCategory, count]) => (
                  <div key={subCategory} className="subcategory-card">
                    <h4>{subCategory}</h4>
                    <p>
                      {count} product{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(activeSection === "addProduct" || activeSection === "editProduct") && (
          <div className="add-product">
            <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={editingProduct ? editingProduct.category : newProduct.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {mainCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {(editingProduct?.category || newProduct.category) && (
                <div className="form-group">
                  <label htmlFor="subCategory">Subcategory</label>
                  <select
                    id="subCategory"
                    name="subCategory"
                    value={editingProduct ? editingProduct.subCategory : newProduct.subCategory}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subCategories[editingProduct?.category || newProduct.category]?.map((subCategory) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={editingProduct ? editingProduct.description : newProduct.description}
                  onChange={handleChange}
                  placeholder="Product Description"
                  required
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Product Image</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} />
              </div>

              {/* Show current image if editing */}
              {editingProduct && editingProduct.imageUrl && (
                <div className="current-image-preview">
                  <p>Current Image:</p>
                  <AdminProductImage imageUrl={editingProduct.imageUrl} alt={editingProduct.name} />
                </div>
              )}

              <button type="submit" className="submit-btn">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        )}

        {activeSection === "allProducts" && (
          <>
            <div className="products-header">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="add-btn" onClick={() => handleNavItemClick("addProduct")}>
                <Plus size={20} /> Add Product
              </button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("name")} className="sortable">
                      <span>Name</span>
                      {sortConfig.key === "name" &&
                        (sortConfig.direction === "ascending" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </th>
                    <th onClick={() => handleSort("category")} className="sortable category-column">
                      <span>Category</span>
                      {sortConfig.key === "category" &&
                        (sortConfig.direction === "ascending" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </th>
                    <th onClick={() => handleSort("subCategory")} className="sortable subcategory-column">
                      <span>Subcategory</span>
                      {sortConfig.key === "subCategory" &&
                        (sortConfig.direction === "ascending" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </th>
                    <th className="image-column">Image</th>
                    <th className="action-column">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product._id}>
                        <td data-label="Name">{product.name}</td>
                        <td data-label="Category" className="category-column">
                          {product.category}
                        </td>
                        <td data-label="Subcategory" className="subcategory-column">
                          {product.subCategory}
                        </td>
                        <td className="product-image-cell">
                          <AdminProductImage imageUrl={product.imageUrl} alt={product.name} />
                        </td>
                        <td className="action-icons">
                          <button className="edit-btn" onClick={() => handleEdit(product)} aria-label="Edit product">
                            <Edit size={18} />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(product._id)}
                            aria-label="Delete product"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-results">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
