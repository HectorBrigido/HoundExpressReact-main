import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchResults from '../src/components/SearchResults';
import SongResult from '../src/components/SongResult';

jest.mock('../src/components/SongResult', () => {
  // eslint-disable-next-line react/display-name
  return jest.fn(({ song }) => (
    <div data-testid="mock-song-result">
      <h3>{song.title}</h3>
      <p>{song.artist.name}</p>
      <button>
        Agregar a mi biblioteca
      </button>
    </div>
  ));
});

const mockStore = configureStore([]);

describe('SearchResults', () => {
  const searchTerm = 'test';
  const mockSongs = [
    { id: '1', title: 'Song One', artist: { name: 'Artist A' } },
    { id: '2', title: 'Song Two', artist: { name: 'Artist B' } },
  ];

  let store;

  beforeEach(() => {
    store = mockStore({});
    SongResult.mockClear();
  });

  test('displays a message when no artists are found', () => {
    render(<SearchResults songs={[]} searchTerm={searchTerm} />);
    expect(screen.getByText(`No se encontraron canciones para "${searchTerm}".`)).toBeInTheDocument();
  });

  test('renders a list of artists correctly with simulated data', () => {
    render(
      <Provider store={store}>
        <SearchResults songs={mockSongs} searchTerm={searchTerm} />
      </Provider>
    );

   
    expect(SongResult).toHaveBeenCalledTimes(mockSongs.length);
    expect(SongResult).toHaveBeenCalledWith({ song: mockSongs[0] }, {});
    expect(SongResult).toHaveBeenCalledWith({ song: mockSongs[1] }, {});

    expect(screen.getByText('Song One')).toBeInTheDocument();
    expect(screen.getByText('Artist A')).toBeInTheDocument();

    expect(screen.getByText('Song Two')).toBeInTheDocument();
    expect(screen.getByText('Artist B')).toBeInTheDocument();
  });
});