// App.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [mirror, setMirror] = useState(false);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [loadedImage, setLoadedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    applyTransformation(document.getElementById('loadedImage'));
  }, [rotation, scale, mirror])

  const handleImageChange = (event) => {
    setImageUrl(event.target.value);
    setError(null);
  };

  const handleRotationChange = (event) => {
    const degrees = parseInt(event.target.value, 10);
    setRotation(degrees);
  };
  
  const handleScaleChange = (event) => {
    const newScale = parseFloat(event.target.value);
    setScale(newScale);
  };
  
  const handleMirrorToggle = () => {
    setMirror((prevMirror) => !prevMirror);
  };


const applyTransformation = (imageElement) => {
  if (imageElement) {
    let transformValue = `rotate(${rotation}deg)`;
    transformValue += mirror ? ' scale(-1, 1)' : ''; // Mirror effect using scale
    transformValue += ` scale(${scale})`;

    imageElement.style.transform = transformValue;

    // Apply additional styles based on the state
    if (mirror) {
      imageElement.classList.add('mirrored');
    } else {
      imageElement.classList.remove('mirrored');
    }

    if (rotation !== 0) {
      imageElement.classList.add('rotated');
    } else {
      imageElement.classList.remove('rotated');
    }

    if (scale !== 1) {
      imageElement.classList.add('scaled');
    } else {
      imageElement.classList.remove('scaled');
    }
  }
};

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  
      // Check if the response content type is a valid image type
      const contentType = response.headers['content-type'];
      if (!contentType.includes('image/png') && !contentType.includes('image/jpeg')) {
        setError('Please enter a valid image URL ending with .png or .jpeg.');
        setLoadedImage(null); // Clear loaded image on invalid content type
        return;
      }
  
      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      setLoadedImage(`data:${contentType};base64,${base64Image}`);
      applyTransformation(rotation, scale, mirror);
      setError(null);
    } catch (error) {
      console.error('Error fetching image:', error);
      setError('Error fetching image. Please check the URL and try again.');
      setLoadedImage(null); // Clear loaded image on error
    }
  };

  return (
    <Container className="app-container">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} className="app-form">
            <Form.Group controlId="imageUrl" className="app-form-group">
              <Form.Label>Image URL:</Form.Label>
              <Form.Control type="text" value={imageUrl} onChange={handleImageChange} className="app-input" />
            </Form.Group>
            <Button variant="primary" type="submit" className="app-button">
              Load Image
            </Button>
          </Form>
          {error && <Alert variant="danger" className="app-alert">{error}</Alert>}
          {loadedImage && (
            <>
              <Form.Group controlId="rotation" className="app-form-group">
                <Form.Label>Rotation (degrees):</Form.Label>
                <Form.Control type="number" value={rotation} onChange={handleRotationChange} className="app-input" />
              </Form.Group>
              <Form.Group controlId="scale" className="app-form-group">
                <Form.Label>Scale:</Form.Label>
                <Form.Control type="number" value={scale} onChange={handleScaleChange} className="app-input" />
              </Form.Group>
              <Button variant="secondary" onClick={handleMirrorToggle} className="app-button">
                Toggle Mirror
              </Button>
              <Form.Group controlId="topText" className="app-form-group">
                <Form.Label>Top Text:</Form.Label>
                <Form.Control type="text" value={topText} onChange={handleTopTextChange} className="app-input" />
              </Form.Group>
              <Form.Group controlId="bottomText" className="app-form-group">
                <Form.Label>Bottom Text:</Form.Label>
                <Form.Control type="text" value={bottomText} onChange={handleBottomTextChange} className="app-input" />
              </Form.Group>
              <Form.Group controlId="textColor" className="app-form-group">
                <Form.Label>Text Color:</Form.Label>
                <Form.Control type="color" value={textColor} onChange={handleTextColorChange} className="app-input" />
              </Form.Group>
            </>
          )}
        </Col>
        <Col>
          <div className="app-image-container">
            {loadedImage && (
              <div className="app-image-wrapper">
                <img
                  src={loadedImage}
                  alt="Selected"
                  className="img-fluid"
                  style={{
                    transform: `rotate(${rotation}deg) scale(${scale})${mirror ? ' scaleX(-1)' : ''}`,
                  }}
                />
                <div
                  className="app-top-text"
                  style={{color: textColor}}
                >
                  {topText}
                </div>
                <div
                  className="app-bottom-text"
                  style={{color: textColor}}
                >
                  {bottomText}
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
