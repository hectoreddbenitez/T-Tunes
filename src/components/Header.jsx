import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search" />
        <Link to="/favorites" data-testid="link-to-favorites" />
        <Link to="/profile" data-testid="link-to-profile" />
        <div data-testid="header-user-name">
          { name }
          {loading ? <Loading /> : null }
        </div>
      </header>
    );
  }
}

export default Header;
