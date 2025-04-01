"use client"

import { useRef, useEffect } from "react"
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react"
import "./ContactUs.css"

function ContactUs() {
  const contactRef = useRef(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash === "#contact" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/9779841214032", "_blank")
  }

  return (
    <section className="contact-us" id="contact" ref={contactRef}>
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">We're here to answer any questions you may have</p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-group">
              <h3 className="info-title">Contact Information</h3>
              <div className="info-item">
                <Phone size={20} />
                <div>
                  <p>+977 9841214032</p>
                  <p>+977 9808741780</p>
                </div>
              </div>
              <div className="info-item">
                <Mail size={20} />
                <a href="mailto:stha.heem555@gmail.com" className="email-link">
                  stha.heem555@gmail.com
                </a>
              </div>
              <div className="info-item">
                <MapPin size={20} />
                <p>Swoyambhu, Karkhana Chowk</p>
              </div>
            </div>
            <div className="info-group">
              <h3 className="info-title">Business Hours</h3>
              <div className="info-item">
                <Clock size={20} />
                <p>Sunday - Friday: 9: 00 AM - 7:00 PM</p>
              </div>
            </div>
            <button onClick={handleWhatsAppRedirect} className="whatsapp-btn">
              <MessageCircle size={20} />
              CHAT US NOW
            </button>
          </div>
          <div className="map-container">
            <iframe
              title="Shop Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0698974709953!2d85.28050637525406!3d27.71512807617803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb188ff07feff9%3A0x3ddede4544ed06d1!2sDream%20House%20Colour%20World!5e0!3m2!1sen!2snp!4v1739887513174!5m2!1sen!2snp"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs

