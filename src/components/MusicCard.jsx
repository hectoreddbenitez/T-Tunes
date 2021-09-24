import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  handleOnClick = (event) => {
    const { onChange, music } = this.props;
    onChange(event, music);
  }

  render() {
    const { music, isFavorite } = this.props;
    return (
      <div>
        <p>{music.trackName}</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            id="favorite"
            type="checkbox"
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ this.handleOnClick }
            checked={ isFavorite }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,

};
export default MusicCard;
