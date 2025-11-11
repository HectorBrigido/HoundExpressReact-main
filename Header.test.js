import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header'; 

describe('Header', () => {
  test('renders the application title "Biblioteca Musical" correctly', () => {
    render(<Header />);
    const titleElement = screen.getByText(/Biblioteca Musical/i);
    expect(titleElement).toBeInTheDocument();
  });

  
});