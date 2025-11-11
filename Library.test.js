import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Library from '../src/components/Library'; 
import { removeItem } from '../src/redux/slices/librarySlice'; 

const mockStore = configureStore([]);

describe('Library', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      library: {
        artists: [],
        albums: [],
        songs: [],
      },
    });
    store.dispatch = jest.fn(); 
  });

  test('displays "No hay canciones en tu biblioteca" when the library is empty', () => {
    render(
      <Provider store={store}>
        <Library />
      </Provider>
    );
    expect(screen.getByText(/Aún no has agregado nada a tu biblioteca./i)).toBeInTheDocument();
  });

  test('renders a list of songs/artists correctly with simulated data', () => {
    const mockArtists = [{ idArtist: '1', strArtist: 'Artist One', strArtistThumb: 'thumb1' }];
    const mockAlbums = [{ idAlbum: '10', strAlbum: 'Album One', strAlbumThumb: 'thumb10', artist: { name: 'Artist One' } }];
    const mockSongs = [{ idSong: '100', title: 'Song One', album: { cover: 'cover100', title: 'Album One' }, artist: { name: 'Artist One' } }];

    store = mockStore({
      library: {
        artists: mockArtists,
        albums: mockAlbums,
        songs: mockSongs,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Library />
      </Provider>
    );

    expect(screen.getByText('Artist One')).toBeInTheDocument();
    expect(screen.getByText('Album One')).toBeInTheDocument();
    expect(screen.getByText('Song One')).toBeInTheDocument();
  });

  test('each song/artist has an "Eliminar" button that executes a function on click', () => {

    const mockArtist = { idArtist: '1', strArtist: 'Artist One', strArtistThumb: 'thumb1' };
    store = mockStore({
      library: {
        artists: [mockArtist],
        albums: [],
        songs: [],
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Library />
      </Provider>
    );

    const removeButton = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(removeButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(removeItem({ itemType: 'artist', itemId: mockArtist.idArtist }));
  });
});