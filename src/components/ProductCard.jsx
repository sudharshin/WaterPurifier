import React from 'react'
import { Card } from 'react-bootstrap'

const ProductCard = ({ title, image }) => {
  return (
    <Card className="shadow-sm">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
