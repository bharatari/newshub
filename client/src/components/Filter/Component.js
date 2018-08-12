import React, { PropTypes } from 'react';

export default class Paginator extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    goToPage: PropTypes.func,
  };
  render() {
    // Checkboxes to hide or show each column
    // Filters with equal, not equal, less than, greater than, contains options
    return (
      <div className="ui pagination menu">
      </div>
    );
  }
}
