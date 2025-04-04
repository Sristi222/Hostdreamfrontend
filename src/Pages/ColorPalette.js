"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../components/ColorPalette.css"

const colorPalettes = [
    {
      name: "Red",
      shades: [
        { code: "8025", hex: "#FFD6B6" }, // Popsicle
    { code: "8024", hex: "#FFB896" }, // Orange Nectar
    { code: "8023", hex: "#F7906E" }, // Carrot Punch
    { code: "8022", hex: "#F66B43" }, // Tropical Peach
    { code: "8035", hex: "#FFE3D8" }, // Rose Bud
    { code: "8034", hex: "#FFD2C4" }, // Pink Bib
    { code: "8033", hex: "#FFC2B0" }, // Pink Crush
    { code: "8032", hex: "#FFB1A0" }, // Sugared Peach
    { code: "8031", hex: "#EF927C" }, // Rosy Coral
    { code: "8030", hex: "#D97460" }, // Coral Cove
    { code: "8029", hex: "#B14F3F" }, // (bottom-left)
    { code: "8028", hex: "#CE4434" }, // (next to it)
    { code: "8027", hex: "#FFECE3" }, // (light peach)
    { code: "8026", hex: "#FFD1C8" }, // (pink pastel)
    { code: "X126", name: "Cherry Brandy", hex: "#a14456" },
    { code: "X125", name: "Moulin Rouge", hex: "#9e3e50" },
    { code: "X130", name: "Raspberry Crush", hex: "#7e454a" },
    { code: "X129", name: "Burgundy Plus", hex: "#783e41" },
    { code: "X128", name: "Dark Cherry", hex: "#693b3f" },
    { code: "8125", name: "Wild Prune", hex: "#8c3e46" },
    { code: "8133", name: "Berry Brunch", hex: "#843745" },
    { code: "8093", name: "Pure Red", hex: "#cb3e3a" },
    { code: "X122", name: "Rich Rouge", hex: "#b84748" },
    { code: "8085", name: "Scarlet", hex: "#be3f44" },
    { code: "X124", name: "Red Alert", hex: "#a63e4d" },
    { code: "X123", name: "Crimson Depth", hex: "#7c3b44" },
    { code: "8021", name: "Hot Shot", hex: "#f2633b" },
    { code: "8045", name: "Centre Stage", hex: "#e45741" },
    { code: "X117", name: "Rodeo", hex: "#ba4c3d" },
    { code: "5206", name: "Pale Rose", hex: "#fbb3ae" },
    { code: "8047", name: "Jaipur Dreams", hex: "#f5938a" },
    { code: "8046", name: "Coral Island", hex: "#f37c6f" },
    { code: "8055", name: "Rose Mist", hex: "#f39d9d" },
    { code: "8054", name: "Raspberry Souffle", hex: "#e98183" },
    { code: "8053", name: "Ginger Pop", hex: "#c95648" },
    { code: "8062", name: "Satin Pink", hex: "#f47877" },
    { code: "8079", name: "Pink Accent", hex: "#df757d" },
    { code: "8078", name: "May Fair", hex: "#d56263" },
    { code: "9406", name: "Rose Meadows", hex: "#cc5d62" },
      ],
    },
    {
    name: "Blue",
    shades: [
    { code: "7250", hex: "#C9DDEA" }, // Pool Party
    { code: "7249", hex: "#B3D1EA" }, // Morning Sky
    { code: "7248", hex: "#91B6DA" }, // Blue Charm
    { code: "7275", hex: "#C2D7E0" }, // Blue Dawn
    { code: "7274", hex: "#A9C9E2" }, // Summer Sky
    { code: "7273", hex: "#92B9D5" }, // Scuba Blue
    { code: "7330", hex: "#A7D4E9" }, // Young Boy
    { code: "7329", hex: "#85CCE9" }, // Blue Bay
    { code: "7326", hex: "#2186C4" }, // Soothing Sapphire
    { code: "7325", hex: "#194F86" }, // Twilight Zone
    { code: "7331", hex: "#D2ECF4" }, // Light Sky
    { code: "7346", hex: "#BEDDE7" }, // Young Bloom
    { code: "7345", hex: "#9FD3E6" }, // Splash
    { code: "7344", hex: "#80C0DD" }, // Gauguin Blue
    { code: "7343", hex: "#5B9DBC" }, // Firmament
    { code: "7342", hex: "#3A7EA5" }, ],
    },
    {
      name: "Green",
      shades: [
        { code: "7562", hex: "#B6D8C3" },
        { code: "7561", hex: "#A5D3BA" },
        { code: "7560", hex: "#84B8A4" },
        { code: "7559", hex: "#6DA190" },
        { code: "7558", hex: "#598A74" },
        { code: "7557", hex: "#365C50" },
        { code: "7556", hex: "#558E76" },
        { code: "7555", hex: "#7ED996" },
        { code: "7554", hex: "#2A7D65" },
        { code: "7582", hex: "#648C74" },
        { code: "2425", hex: "#E7F0E2" },
        { code: "7625", hex: "#B7D0B9" },
        { code: "7624", hex: "#A7C2AB" },
        { code: "7622", hex: "#6F8F6F" },
        { code: "2361", hex: "#4C5D41" },
        { code: "7611", hex: "#E0F4DD" },
        { code: "7609", hex: "#A6E2C3" },
        { code: "7608", hex: "#70BD84" },
        { code: "7607", hex: "#5AA968" },
        { code: "7606", hex: "#3E7A4F" },
      ],
    },
    {
      name: "Yellow",
      shades: [
        // 🔥 Bright Oranges
    { code: "7950", hex: "#FCA840" }, // Fire Globe
    { code: "7941", hex: "#FFA700" }, // Turmeric
    { code: "X109", hex: "#FFA824" }, // Mango Mood

    // ☀️ Soft Yellows
    { code: "7914", hex: "#FFF1D3" }, // Sundrenched
    { code: "7913", hex: "#FFEDB9" }, // Golden Aura
    { code: "7912", hex: "#FFE5A4" }, // Yellow Tulip
    { code: "7911", hex: "#FFD975" }, // Ski Valley
    { code: "7923", hex: "#FFF3DA" }, // Summer Sprinkle
    { code: "7922", hex: "#FFEFC6" }, // Wild Honey
    { code: "7921", hex: "#FFE5A8" }, // Summer Harvest
    { code: "7920", hex: "#FFCC84" }, // Yellow Metal
    { code: "7919", hex: "#FFBC5E" }, // Burnished Sun
    { code: "7918", hex: "#F9A936" }, // Empire Yellow

    // 🧈 Earthy Yellows
    { code: "7828", hex: "#F8F2D9" }, // Spirit Island
    { code: "7831", hex: "#F4D76A" }, // Brazen Gold
    { code: "7859", hex: "#FDF5DD" }, // Lemon Pie
    { code: "7857", hex: "#FDE9B7" }, // Yellow Suds
    { code: "7856", hex: "#F2DA8B" }, // Goldilocks
    { code: "7855", hex: "#E5CA7B" }, // Inca Ruins
    { code: "7854", hex: "#D6B862" }, // Sea Kelp
    { code: "7853", hex: "#CBA741" }, // Open Range
    { code: "7868", hex: "#FFFBE1" }, // Sun Screen
    { code: "7867", hex: "#FFF8D0" }, // Summer Dew
      ],
    },
    {
      name: "Purple",
      shades: [
        // 🌸 Pinks
    { code: "9425", hex: "#ECB6D9" }, // Outdoor Pink
    { code: "9417", hex: "#F5C6DD" }, // Rose Essence
    { code: "9416", hex: "#E5AFCB" }, // Twilight Pink
    { code: "9414", hex: "#C25886" }, // Pink Flower
    { code: "9428", hex: "#FDEEE9" }, // Sky Pink
    { code: "9427", hex: "#FCE4E5" }, // Delicate Pink
    { code: "9426", hex: "#F9D6E7" }, // Candy Floss
    { code: "9424", hex: "#E9A7C8" }, // Morning Rays

    // 🌷 Lavenders & Mauves
    { code: "7113", hex: "#E3BADC" }, // Tickled Pink
    { code: "9121", hex: "#CDAAD5" }, // Dancing Pink
    { code: "7112", hex: "#D1A6D3" }, // Wisteria
    { code: "7111", hex: "#C495C6" }, // Japanese Lilac
    { code: "7110", hex: "#A26CAB" }, // Happy Hyacinth
    { code: "7109", hex: "#6E4A6B" }, // Iris Impact
    { code: "9120", hex: "#AD8BC1" }, // Pink Reserve
    { code: "7147", hex: "#E6DDE5" }, // Lavender Laugh
    { code: "7146", hex: "#CDBFCE" }, // Mauve Hint
    { code: "7145", hex: "#C3B4CB" }, // Wisteria Wish

    // 💜 Lilac / Violet Spectrum
    { code: "7162", hex: "#E3DAE7" }, // Quartz Illusion
    { code: "7161", hex: "#D5C9E7" }, // Potpourri
    { code: "7160", hex: "#BFB5DA" }, // Dash Of
    { code: "7159", hex: "#A199C4" }, // Velvet Night
    { code: "7158", hex: "#8A78AE" }, // Royal Robes
    { code: "7171", hex: "#D8D4E2" }, // Carefree Breeze
    { code: "7170", hex: "#C9C0E0" }, // Misty Purple
    { code: "7051", hex: "#D1CADA" }, // Reverie
    { code: "7168", hex: "#A9A2C6" }, // Orchid Bloom
    { code: "7167", hex: "#9A94B6" }, // Tiffany
      ],
    },
    {
      name: "Brown",
      shades: [
        { code: "8580", hex: "#F5E7D5" },
    { code: "8579", hex: "#ECD7BC" },
    { code: "8578", hex: "#E4C7A9" },
    { code: "8577", hex: "#D1B294" },
    { code: "8576", hex: "#B59174" },
    { code: "8575", hex: "#A67859" },
    { code: "8574", hex: "#9D6B4E" },
    { code: "8573", hex: "#875A3F" },
    { code: "8586", hex: "#EAC9AA" },
    { code: "8584", hex: "#AF8970" },
    { code: "8572", hex: "#976C4F" },
    { code: "8571", hex: "#8A6245" },
    { code: "8570", hex: "#80563B" },
    { code: "8569", hex: "#6A4738" },
    { code: "8568", hex: "#D9B892" },
    { code: "8518", hex: "#C08E57" },
    { code: "8517", hex: "#A87545" },
    { code: "8532", hex: "#F4E4C7" },
    { code: "8530", hex: "#E4CB9F" },
    { code: "4215", hex: "#E6D5BC" },
    { code: "8528", hex: "#B78E63" },
    { code: "8527", hex: "#B08556" },
    { code: "8526", hex: "#A57949" },
    { code: "8525", hex: "#8C6238" },
    { code: "8539", hex: "#F0D6B4" },
    { code: "8538", hex: "#EDD3AC" },
    { code: "8537", hex: "#DBBB94" },
    { code: "8536", hex: "#C9A577" },
    { code: "8535", hex: "#B28B63" },
    { code: "8534", hex: "#A4754E" },
    { code: "9522", hex: "#D5C4A2" },
    { code: "8481", hex: "#CFC1A0" },
    { code: "8480", hex: "#BFB18C" },
    { code: "8479", hex: "#A99873" },
    { code: "8478", hex: "#9E8E69" },
    { code: "8477", hex: "#857652" },
    { code: "8499", hex: "#F0E1C6" },
    { code: "0N02", hex: "#BDAE90" },

      ]},
    {
      name: "Gray",
      shades: [
        { code: "8235", hex: "#D9D4D0" },
    { code: "8234", hex: "#C3BEBE" },
    { code: "8233", hex: "#AAA8AC" },
    { code: "8232", hex: "#86888D" },
    { code: "8231", hex: "#726F72" },
    { code: "8230", hex: "#605C5E" },
    { code: "8229", hex: "#453F3D" },
    { code: "8252", hex: "#DEE0DD" },
    { code: "8251", hex: "#D1D0CE" },
    { code: "6129", hex: "#9FA8AE" },
    { code: "6142", hex: "#B6BAB7" },
    { code: "8289", hex: "#9EA4A5" },
    { code: "8288", hex: "#838B8C" },
    { code: "8287", hex: "#6F7575" },
    { code: "8286", hex: "#575E5E" },
    { code: "8285", hex: "#464947" },
    { code: "8299", hex: "#DAD4CB" },
    { code: "8298", hex: "#CDC7BF" },
    { code: "8297", hex: "#BDB6AE" },
    { code: "8296", hex: "#A09F98" },
    { code: "8304", hex: "#7D8180" },
    { code: "8303", hex: "#6F716E" },
    { code: "8302", hex: "#595D5B" },
    { code: "8301", hex: "#464947" },
    { code: "8469", hex: "#4E463C" },
    { code: "8314", hex: "#B7BFB9" },
    { code: "8313", hex: "#9EA8A5" },
    { code: "8312", hex: "#86908E" },
    { code: "8311", hex: "#6C7472" },
    { code: "8310", hex: "#545B59" },
      ],
    },

    {
      name: "White",
      shades: [
        { code: "L122", hex: "#F3EFE1" }, // Skimmed Cream
    { code: "8483", hex: "#F0ECE1" }, // Natural Cream
    { code: "L152", hex: "#E9E2D3" }, // Cream Pie
    { code: "L155", hex: "#F6F3E8" }, // Pale Sisal
    { code: "L153", hex: "#F6F3EA" }, // Pristine Linen
    { code: "8484", hex: "#EEEDEB" }, // Soft Glance
    { code: "8428", hex: "#F1F0EE" }, // Glacier Ridge
    { code: "L109", hex: "#F4F3F0" }, // Icy Peak
    { code: "8300", hex: "#F1F1EF" }, // Confetti
    { code: "L154", hex: "#F1F1EF" }, // Pipe Dream
    { code: "L127", hex: "#EEEADE" }, // Sesame Seed
    { code: "L131", hex: "#EEEBE3" }, // Lovely Lace
    { code: "7948", hex: "#E9E5DA" }, // Crescent
    { code: "7860", hex: "#E7E5DA" }, // Thick Cream
    { code: "3203", hex: "#E9E7E0" }, // Puppy Love
      ],
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
                  <div className="color-sample" style={{ backgroundColor: shade.hex }}>
                    <span className="sample-name">Code: {shade.code}</span>
                    {/* No hex shown */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <div style={{ height: "400px", width: "100%" }}></div>
      <Footer />
    </div>
  )
}

export default ColorPalette
