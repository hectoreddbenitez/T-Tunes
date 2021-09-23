import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      value: '',
      loading: false,
      userChoise: [],
      name: '',
    };
    this.foundMessage = this.foundMessage.bind(this);
  }

  handleBtnEnabel = ({ target: { value } }) => {
    const caracterMin = 2;
    this.setState({
      button: value.length < caracterMin,
      value,
    });
  };

  handleClick = () => {
    const { value } = this.state;
    this.setState({ loading: true }, async () => {
      const album = await searchAlbumsAPI(value);
      // this.renderMessage();
      this.setState((previusState) => ({
        value: '',
        userChoise: album,
        loading: false,
        name: previusState.value,
      }));
    });
  }

  notFoundMessage() {
    return (
      <p>Nenhum álbum foi encontrado</p>
    );
  }

  foundMessage(userChoise, name) {
    return (
      <>
        <p>{`Resultado de álbuns de: ${name}`}</p>
        {userChoise.map((album) => (
          <AlbumCard key={ album.id } album={ album } />
        ))}
      </>
    );
  }

  render() {
    const { button, value, loading, userChoise, name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            value={ value }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleBtnEnabel }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ button }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
          {
            userChoise.length > 0
              ? this.foundMessage(userChoise, name)
              : this.notFoundMessage()
          }
          {loading ? <Loading /> : null }
        </form>
      </div>
    );
  }
}

export default Search;
