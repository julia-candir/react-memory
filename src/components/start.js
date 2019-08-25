import React from 'react';
import { addUsername } from '../actions/index';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    addUsername: name => dispatch(addUsername(name)),
  };
}

class StartPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.addUsername(this.state.username);
    this.setState({ username: '' });
    this.props['history'].push('/game');
  }
  render() {
    const { username } = this.state;
    return (
      <form className="row gameplace my-5 fade-in" onSubmit={this.handleSubmit}>
        <div className="col-12 text-center">
          {' '}
          <div className="d-flex align-items-center justify-content-center rounded-circle hat-out mx-auto mb-4">
            <img className="hat-in" alt="front" src={`/images/hat.png`} />
          </div>
          <h3>Greetings in our hall wizard!</h3>
          <p>
            Sorting Hat will help you choose your house <br /> Tell us your name please:
          </p>
          <input
            type="text"
            className="form-control my-3"
            id="username"
            value={username}
            onChange={this.handleChange}
          />
          <span className="test">
            <button className="btn btn-dark px-5" type="submit" disabled={!username}>
              Alohomora!<span className="showonhover fade-in">Start for muggles</span>
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const Start = connect(
  null,
  mapDispatchToProps,
)(StartPage);

export default Start;
