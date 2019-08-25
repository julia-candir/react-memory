import React from 'react';
import './game.css';
import { connect } from 'react-redux';
import Card from './card';
import { Redirect } from 'react-router-dom';
import { addClicks } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    addClicks: clicks => dispatch(addClicks(clicks)),
  };
}

const mapStateToProps = state => {
  return { username: state.username, clicks: state.clicks };
};

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wizards: ['dumbledore', 'harry', 'hermione', 'ron', 'snape', 'voldemort'],
      duplicatedWizards: [],
      randomizedWizards: [],
      finalizedWizards: [],
      openedWizards: [],
      matchedWizards: 0,
      clicks: 0,
    };
    this.start();
  }

  handleClick(name, index) {
    if (this.state.openedWizards.length === 2) {
      setTimeout(() => {
        this.check();
      }, 150);
    } else {
      let wizard = {
        name,
        index,
      };
      let finalizedWizards = this.state.finalizedWizards;
      let wizards = this.state.openedWizards;
      finalizedWizards[index].close = false;
      wizards.push(wizard);

      this.setState({
        openedWizards: wizards,
        finalizedWizards: finalizedWizards,
      });
      if (this.state.openedWizards.length === 2) {
        setTimeout(() => {
          this.check();
        }, 250);
      }
    }
  }

  ifExist() {
    if (
      this.state.openedWizards.length > 0 &&
      this.state.openedWizards[0] !== 'undefined' &&
      this.state.openedWizards[1] !== 'undefined'
    ) {
      return true;
    } else {
      return false;
    }
  }

  check() {
    let finalizedWizards = this.state.finalizedWizards;
    let matchedWizards = this.state.matchedWizards;
    const tryCount = this.state.clicks;

    if (this.ifExist()) {
      if (
        this.state.openedWizards[0].name === this.state.openedWizards[1].name &&
        this.state.openedWizards[0].index !== this.state.openedWizards[1].index
      ) {
        finalizedWizards[this.state.openedWizards[0].index].complete = true;
        finalizedWizards[this.state.openedWizards[1].index].complete = true;
        matchedWizards += 1;
        this.state.openedWizards = [];
      } else {
        finalizedWizards[this.state.openedWizards[0].index].close = true;
        finalizedWizards[this.state.openedWizards[1].index].close = true;
      }
    }

    this.setState({
      finalizedWizards,
      openedWizards: [],
      clicks: tryCount + 1,
      matchedWizards,
    });
    this.props.addClicks(this.state.clicks);
  }

  start() {
    let finalizedWizards = [];

    this.state.duplicatedWizards = this.state.wizards.concat(this.state.wizards);
    this.state.randomizedWizards = this.shuffle(this.state.duplicatedWizards);
    this.state.randomizedWizards.map(name => {
      return finalizedWizards.push({
        name,
        close: true,
        complete: false,
        fail: false,
      });
    });
    this.state.finalizedWizards = finalizedWizards;
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    if (this.state.matchedWizards === 6) {
      return <Redirect to={'/result'} />;
    }

    return (
      <div className="gameplace my-5 text-center">
        <h1>Hello,</h1>
        <h3>{this.props.username ? this.props.username : 'Creature who got here directly through url'}</h3>
        <h6 className="mt-3">Number of tries</h6>
        <h4 className="mb-4">- {this.state.clicks} -</h4>

        <div className="playground">
          {this.state.finalizedWizards.map((wizard, index) => {
            return (
              <Card
                key={'mykey' + index}
                wizard={wizard.name}
                click={() => {
                  this.handleClick(wizard.name, index);
                }}
                close={wizard.close}
                complete={wizard.complete}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);
export default Game;
