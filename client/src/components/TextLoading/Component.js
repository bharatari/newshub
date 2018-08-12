import React from 'react';
import classes from './Styles.scss';

export default class TextLoading extends React.Component {
  render() {
    const loading = <h3 className={classes.loading}>Loading...</h3>;

    return (
      <div>
        { this.props.loading ? loading : null }
      </div>
    );
  }
}
