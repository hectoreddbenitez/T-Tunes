import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumName: '',
      artist: '',
      musics: [],
      loading: false,
      favoriteMusic: [],
    };
  }

  componentDidMount() {
    this.albumChoiced();
    this.getFavorites();
  }

  albumChoiced = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const playList = await getMusics(id);
      const [album, ...musics] = playList;
      this.setState({
        albumName: album.collectionName,
        artist: album.artistName,
        musics,
        loading: false,
      });
    });
  }

  onChange = ({ target }, music) => {
    const action = target.checked ? addSong : removeSong;
    this.setState({ loading: true }, async () => {
      await action(music);
      this.getFavorites();
    });
  }

  getFavorites = () => {
    this.setState({ loading: true }, async () => {
      const favoriteList = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoriteMusic: favoriteList,
      });
    });
  }

  isFavorite = (music, favoriteMusic) => {
    const result = favoriteMusic.some((song) => song.trackId === music.trackId);
    return result;
  }
  // Mais uma vez, o Lucas dando uma salvada monumental!

  renderAlbum = (albumName, artist, musics, favoriteMusic) => (
    <>
      <h2 data-testid="album-name">{albumName}</h2>
      <h3 data-testid="artist-name">{artist}</h3>
      {musics.map((music) => (
        <MusicCard
          key={ music.trackId }
          music={ music }
          onChange={ this.onChange }
          isFavorite={ this.isFavorite(music, favoriteMusic) }
        />
      ))}
    </>
  )

  render() {
    const { albumName, artist, musics, loading, favoriteMusic } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading
            ? <Loading />
            : this.renderAlbum(albumName, artist, musics, favoriteMusic)
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
