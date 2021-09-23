import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Sugestão de criar o componente, Issa Matheus. Salvou! Obg!!!
class AlbumCard extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <div>
        <h1>{ album.artistName }</h1>
        <img src={ album.artworkUrl100 } alt="Foto do album" />
        <p>{ album.collectionName }</p>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          Album
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};

export default AlbumCard;
