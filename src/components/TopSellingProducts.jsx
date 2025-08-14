import React, { useRef } from 'react'
import { Container, Button } from 'react-bootstrap'
import purifier from "../assets/WaterPurifierimg.jpg";
import purifier2 from "../assets/WaterPurifierimg2.jpg";

const TopSellingProducts = () => {
  const scrollRef = useRef(null)

  const products = [
    { title: 'Purifier Model 1', image: purifier },
    { title: 'Purifier Model 2', image: purifier2 },
    { title: 'Purifier Model 3', image: purifier },
    { title: 'Purifier Model 4', image: purifier2 },
    { title: 'Purifier Model 5', image: purifier },
    { title: 'Purifier Model 6', image: purifier2 },
    { title: 'Purifier Model 7', image: purifier },
  ]

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-5" style={{ background: '#f9fafb' }}>
      <Container fluid className="px-6">
        {/* Title & Buttons */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0">Top-Selling Products</h3>
          <div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => scroll('left')}
              className="me-2 rounded-circle"
              style={{ width: '35px', height: '35px' }}
            >
              &lt;
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => scroll('right')}
              className="rounded-circle"
              style={{ width: '35px', height: '35px' }}
            >
              &gt;
            </Button>
          </div>
        </div>

        {/* Scrollable Product Row */}
        <div
          className="d-flex overflow-auto flex-nowrap hide-scrollbar"
          ref={scrollRef}
          style={{ paddingBottom: '0.5rem', scrollBehavior: 'smooth' }}
        >
          {products.map((p, index) => (
            <div
              key={index}
              className="px-2"
              style={{ flex: '0 0 25%' }} // exactly 4 per row
            >
              <div
                className="bg-white shadow-sm rounded p-3 h-100 d-flex flex-column justify-content-between align-items-center"
                style={{
                  minHeight: '300px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)'
                }}
              >
                {/* Product Image */}
                <div style={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '180px',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* Product Title */}
                <h6 className="mt-3 text-center">{p.title}</h6>

                {/* Buy Button */}
                <Button variant="primary" size="sm" className="mt-2">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* CSS to Hide Scrollbar */}
      <style>
        {`
          .hide-scrollbar {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* IE and Edge */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}
      </style>
    </section>
  )
}

export default TopSellingProducts
