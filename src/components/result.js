import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return { username: state.username, clicks: state.clicks };
};
class ResultPage extends React.Component {
  render() {
    if (!this.props.username) {
      return (
        <div className="gameplace text-center mt-5">
          <h3>To gey into Hogwarts you need to play a game first</h3>
          <Link to={'/'}>
            {' '}
            <button className="btn btn-dark mt-3">Bombarda!</button>{' '}
          </Link>
        </div>
      );
    }
    return (
      <div className="gameplace text-center my-5">
        <div>
          <h1>
            Congratulations, <br />
            {this.props.username}
          </h1>
          <h3>You got into:</h3>
          {this.props.clicks <= 10 && (
            <img className="my-3 h-200 fade-in" alt="slytherin" src={`/images/slytherin.png`} />
          )}
          {this.props.clicks >= 11 && this.props.clicks <= 13 && (
            <img className="my-3 h-200 fade-in" alt="gryffindor" src={`/images/gryffindor.png`} />
          )}
          {this.props.clicks >= 14 && this.props.clicks <= 16 && (
            <img className="my-3 h-200 fade-in" alt="ravenclaw" src={`/images/ravenclaw.png`} />
          )}
          {this.props.clicks >= 17 && (
            <img className="my-3 h-200 fade-in" alt="hufflepuff" src={`/images/hufflepuff.png`} />
          )}
        </div>

        <h3>
          you got there with <span className="text-warning">{this.props.clicks}</span> tries
        </h3>
        <Link to={'/'}>
          {' '}
          <button className="btn btn-dark mt-3">Try again</button>{' '}
        </Link>
      </div>
    );
  }
}
const Result = connect(mapStateToProps)(ResultPage);
export default Result;
