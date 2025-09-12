import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

const WhyChooseUs = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h3 className="mb-4">Why Choose Us</h3>
        <Row>
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title>Quality Products</Card.Title>
                <Card.Text>
                  We provide the highest quality water purification systems.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title>Excellent Support</Card.Title>
                <Card.Text>
                  Our customer support is available 24/7 to assist you.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default WhyChooseUs
