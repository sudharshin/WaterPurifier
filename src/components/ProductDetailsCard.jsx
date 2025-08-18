import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductDetailsCard = ({ image, title, desc, price }) => {
  return (
    <Card
      className="me-3"
      style={{ minWidth: "250px", borderRadius: "12px", overflow: "hidden" }}
    >
      <Card.Img
        variant="top"
        src={image}
        style={{ height: "180px", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
          {desc}
        </Card.Text>
        <h5 className="fw-bold mb-3">₹{price}</h5>
        <Button variant="primary" style={{ borderRadius: "8px" }}>
          Shop Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductDetailsCard;
