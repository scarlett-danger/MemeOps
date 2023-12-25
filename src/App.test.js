// Import necessary testing libraries
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios'; // Mock Axios for API calls
import App from './App';

// Mock Axios to prevent actual API calls during testing
jest.mock('axios');

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // Ensure that the component renders without crashing
  });

  test('loads image and applies transformations on form submission', async () => {
    // Mock successful API response
    axios.get.mockResolvedValue({
      headers: { 'content-type': 'image/jpeg' },
      data: new ArrayBuffer(10), // Dummy image data
    });

    render(<App />);
    const imageUrlInput = screen.getByLabelText(/image url/i);
    const loadImageButton = screen.getByText(/load image/i);

    // Simulate user input and form submission
    fireEvent.change(imageUrlInput, { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.click(loadImageButton);

    // Wait for asynchronous actions to complete
    await waitFor(() => {
      // Check if transformations are applied to the loaded image
      expect(screen.getByAltText('Selected')).toHaveStyle({
        transform: 'rotate(0deg) scale(1) scaleX(1)',
      });
    });
  });
});
