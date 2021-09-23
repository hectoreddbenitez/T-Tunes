import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumName: '',
      artist: '',
      musics: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.albumChoiced();
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
  // Mais uma vez, o Lucas dando uma salvada monumental!

  renderAlbum = (albumName, artist, musics) => (
    <>
      <h2 data-testid="album-name">{albumName}</h2>
      <h3 data-testid="artist-name">{artist}</h3>
      {musics.map((music) => (
        <MusicCard key="" music={ music } />
      ))}
    </>
  )

  render() {
    const { albumName, artist, musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading
            ? <Loading />
            : this.renderAlbum(albumName, artist, musics)
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Album;
