import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      dadosUsuario: {},
    };
  }

  componentDidMount() {
    this.setEstate();
  }

  setEstate= () => {
    this.setState({ loading: true }, async () => {
      const dadosUsuario = await getUser();
      this.setState({ dadosUsuario, loading: false });
    });
  }

  render() {
    const { dadosUsuario: { name }, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          { name }
          {loading ? <Loading /> : null }
        </div>
      </header>
    );
  }
}

export default Header;
