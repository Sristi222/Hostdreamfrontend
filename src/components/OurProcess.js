import "./OurProcess.css"
import { useEffect, useRef } from "react"

const ProcessStep = ({ icon, title, description }) => {
  return (
    <div className="process-step">
      <div className="step-icon">{icon}</div>
      <h3 className="step-title">{title}</h3>
      <p className="step-description">{description}</p>
    </div>
  )
}


const OurProcess = () => {
  const processRef = useRef(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash === "#our-process" && processRef.current) {
      processRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <section className="our-process">
      <div className="process-container">
        <h2 className="process-title">Our Painting Process</h2>
        <div className="process-steps">
          <ProcessStep
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm4-11c0 .6-.4 1-1 1H9c-.6 0-1-.4-1-1s.4-1 1-1h6c.6 0 1 .4 1 1z" />
              </svg>
            }
            title="Consultation"
            description="We take the time to listen to your vision, understand your needs, and provide expert color advice to bring your ideas to life."
          />
          <ProcessStep
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z" />
              </svg>
            }
            title="Preparation"
            description="Every surface is carefully prepared and inspected to ensure the best possible finish."
          />
          <ProcessStep
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
              </svg>
            }
            title="Painting"
            description="Our skilled team applies premium-quality paints with precision and care, ensuring a perfect result that meets your expectations."
          />
          <ProcessStep
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            }
            title="Final Inspection"
            description="We review every detail with you to ensure the finished project meets our high standards—and, most importantly, yours"
          />
        </div>
      </div>
    </section>
  )
}

export default OurProcess

