import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  clicked(wizard) {
    this.props.click(wizard);
  }
  render() {
    return (
      <div
        className={'card' + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')}
        onClick={() => this.clicked(this.props.wizard)}
      >
        <div className="front">
          <img className="max-w-100" alt="front" src={`/images/back.png`} />
        </div>
        <div className="back">
          <img src={`/images/${this.props.wizard}.jpg`} alt={this.props.wizard + 'card'} />
        </div>
      </div>
    );
  }
}

export default Card;
