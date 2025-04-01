"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../components/ColorPalette.css"

const colorPalettes = [
  {
    name: "Red",
    shades: ["#8B0000", "#A52A2A", "#CD5C5C", "#DC143C", "#FF0000", "#FF4500", "#FF6347", "#FF7F50"],
  },
  {
    name: "Blue",
    shades: ["#000080", "#0000CD", "#0000FF", "#1E90FF", "#4169E1", "#6495ED", "#87CEEB", "#ADD8E6"],
  },
  {
    name: "Green",
    shades: ["#006400", "#008000", "#228B22", "#32CD32", "#3CB371", "#66CDAA", "#90EE90", "#98FB98"],
  },
  {
    name: "Yellow",
    shades: ["#8B8000", "#9ACD32", "#BDB76B", "#DAA520", "#F0E68C", "#FFFF00", "#FFD700", "#FAFAD2"],
  },
  {
    name: "Purple",
    shades: ["#4B0082", "#800080", "#8B008B", "#9400D3", "#9932CC", "#BA55D3", "#DDA0DD", "#EE82EE"],
  },
  {
    name: "Orange",
    shades: ["#8B4500", "#A0522D", "#CD853F", "#D2691E", "#DEB887", "#F4A460", "#FFA500", "#FFD700"],
  },
  {
    name: "Gray",
    shades: ["#2F4F4F", "#696969", "#808080", "#A9A9A9", "#C0C0C0", "#D3D3D3", "#DCDCDC", "#F5F5F5"],
  },
]

const ColorPalette = () => {
  const [activeColor, setActiveColor] = useState(colorPalettes[0].name)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <div className="color-palette-page">
      <Navbar />
      <section className="color-palette">
        <div className="palette-container">
          <h2 className={`palette-title ${animate ? "animate" : ""}`}>Colour Palette</h2>
          <div className={`palette-filters ${animate ? "animate" : ""}`}>
            {colorPalettes.map((palette) => (
              <button
                key={palette.name}
                className={`palette-filter-btn ${activeColor === palette.name ? "active" : ""}`}
                onClick={() => setActiveColor(palette.name)}
              >
                {palette.name}
              </button>
            ))}
          </div>
          <div className={`palette-grid ${animate ? "animate" : ""}`}>
            {colorPalettes
              .find((p) => p.name === activeColor)
              .shades.map((shade, index) => (
                <div key={index} className="palette-item">
                  <div className="color-sample" style={{ backgroundColor: shade }}>
                    <span className="sample-name">
                      {activeColor} {index + 1}
                    </span>
                    <span className="sample-hex">{shade}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Add a large spacer div with fixed height */}
      <div style={{ height: "400px", width: "100%" }}></div>

      <Footer />
    </div>
  )
}

export default ColorPalette

