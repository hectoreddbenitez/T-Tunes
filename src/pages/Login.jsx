import React from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      value: '',
      loading: false,
      redirect: false,
    };
  }

  // Obrigado Isaac Matheus!!

  handleBtnEnabel = ({ target: { value } }) => {
    const caracterMin = 3;
    this.setState({
      button: value.length < caracterMin,
      value,
    });
  };

  handelOnClick = async () => {
    const { value } = this.state;
    this.setState({ loading: true });
    await createUser({ name: value });
    this.setState({ loading: false, redirect: true });
  };

  render() {
    const { button, value, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <form action="">
          <input
            // name="value"
            value={ value }
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleBtnEnabel }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ button }
            onClick={ this.handelOnClick }
          >
            Entrar
          </button>
          {loading ? <Loading /> : null }
          {redirect ? <Redirect to="/search" /> : null }
        </form>
      </div>
    );
  }
}

export default Login;
