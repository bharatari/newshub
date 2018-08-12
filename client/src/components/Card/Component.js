import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';

export default class Card extends React.Component {
  render() {
    let column;

    if (this.props.column) {
      column = this.props.column + ' wide column';
    } else {
      column = 'eight wide column';
    }

    let card;

    if (this.props.noPadding) {
      card = classNames(
        classes.cardNoPadding
      );
    } else {
      card = classNames(
        classes.card
      );
    }

    const styles = {
      backgroundColor: this.props.background,
    };

    return (
      <div className={column}>
        <div className={card} style={styles}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
