import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      value: '',
    //   loading: false,
    //   redirect: false,
    };
  }

  handleBtnEnabel = ({ target: { value } }) => {
    const caracterMin = 2;
    this.setState({
      button: value.length < caracterMin,
      value,
    });
  };

  render() {
    const { button, value } = this.state;
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
