import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../src/components/SearchBar'; 

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders the search input correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/Buscar artistas.../i);
    expect(searchInput).toBeInTheDocument();
  });

  test('user can type in the input and the value changes', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/Buscar artistas.../i);
    fireEvent.change(searchInput, { target: { value: 'Queen' } });
    expect(searchInput.value).toBe('Queen');
  });

  test('the search function is executed when clicking the "Buscar" button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/Buscar artistas.../i);
    fireEvent.change(searchInput, { target: { value: 'Queen' } });
    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }));
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Queen');
  });

  test('the search function is executed when pressing "Enter" in the input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/Buscar artistas.../i);
    fireEvent.change(searchInput, { target: { value: 'Queen' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Queen');
  });
});