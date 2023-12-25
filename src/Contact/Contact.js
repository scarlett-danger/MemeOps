// Contact.jsx

import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  const handleEmailClick = () => {
    const subject = encodeURIComponent('New Contact Form Submission');
    const body = encodeURIComponent('Name:\nEmail:\nMessage:');

    window.location.href = `mailto:scarlett.danger@yahoo.com?subject=${subject}&body=${body}`;
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Contact Us</h2>
          <Form>
            {/* Your form fields here */}
            <Button variant="primary" onClick={handleEmailClick}>
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
