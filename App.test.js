import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { configureStore as configureRealStore } from '@reduxjs/toolkit';
import App from '../src/App'; // Assuming App component path
import * as useFetchMusic from '../src/hooks/useFetchMusic'; // Import the hook to mock it
import libraryReducer, { addItem } from '../src/redux/slices/librarySlice';

// Mock the useFetchMusic hook
jest.mock('../src/hooks/useFetchMusic');

// Unmock ArtistResult for integration testing if it was mocked elsewhere
jest.unmock('../src/components/ArtistResult');

// Helper to render with a real store
const renderWithProviders = (
  ui,
  { store = configureRealStore({ reducer: { library: libraryReducer } }), ...renderOptions } = {}
) => {
  return render(<Provider store={store}>{ui}</Provider>, renderOptions);
};

const mockStore = configureStore([]);

describe('App', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      library: {
        items: [],
      },
    });
    store.dispatch = jest.fn();

    // Reset mock for useFetchMusic before each test
    useFetchMusic.default.mockReset();
  });

  test('renders Header, SearchBar, SearchResults, and Library components', () => {
    useFetchMusic.default.mockReturnValue({ data: null, loading: false, error: null });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Check for Header title
    expect(screen.getByText(/Biblioteca Musical/i)).toBeInTheDocument();

    // Check for SearchBar input
    expect(screen.getByPlaceholderText(/Buscar artistas.../i)).toBeInTheDocument();

    // Check for initial empty SearchResults message
    expect(screen.getByText(/No se encontraron artistas para ""./i)).toBeInTheDocument();

    // Check for initial empty Library message
    expect(screen.getByText(/No hay canciones en tu biblioteca/i)).toBeInTheDocument();
  });

  test('simulates searching for artists and verifies results are shown', async () => {
    const mockArtistsData = {
      data: {
        data: [
          { id: '1', name: 'Test Artist', picture_medium: 'test_url', nb_fan: 500 },
        ],
      },
    };

    useFetchMusic.default.mockReturnValueOnce({ data: null, loading: false, error: null }) // Initial render
      .mockReturnValueOnce({ data: mockArtistsData, loading: false, error: null }); // After search

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(/Buscar artistas.../i);
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }));

    await waitFor(() => {
      expect(screen.getByText('Test Artist')).toBeInTheDocument();
      expect(screen.getByText('500 fans')).toBeInTheDocument();
    });
  });

  test('simulates adding an artist to the library and verifies it appears in the Library section', async () => {
    const mockArtist = { id: '123', name: 'Added Artist', picture_medium: 'added_url', nb_fan: 100 };
    const mockArtistsData = {
      data: {
        data: [mockArtist],
      },
    };

    // Mock the fetch hook to return our artist
    useFetchMusic.default.mockReturnValue({ data: mockArtistsData, loading: false, error: null });

    // Use a real store to see state updates
    const realStore = configureRealStore({
      reducer: { library: libraryReducer },
    });

    render(
      <Provider store={realStore}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Find the "Agregar a mi biblioteca" button and click it
    const addButton = await screen.findByRole('button', { name: /Agregar a mi biblioteca/i });
    fireEvent.click(addButton);

    // The Library component should now show the added artist
    const librarySection = screen.getByTestId('library-section'); // Assuming you add data-testid="library-section" to your Library component
    await waitFor(() => {
      expect(librarySection).toHaveTextContent('Added Artist');
    });
  });
});