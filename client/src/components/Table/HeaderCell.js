import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';

export default class HeaderCell extends React.Component {
  static propTypes = {
    field: PropTypes.object,
  };
  handleClick = () => {
    if (this.props.sortable) {
      let field = this.props.field;
      let sortField = this.props.sortField;
      let sortType = this.props.sortType;

      if (sortField === field.property) {
        if (sortType === 'DESC') {
          sortType = 'ASC';
        } else {
          sortType = 'DESC';
        }
      } else {
        sortType = 'DESC';
      }

      this.props.sortBy(field.property, sortType);
    }
  }
  render() {
    const { field, sortField, sortType, sortBy, sortable, ...props } = this.props;
    const sort = () => {
      if (sortField === field.property) {
        if (sortType === 'DESC') {
          return <i className="ion-chevron-down"></i>;
        } else {
          return <i className="ion-chevron-up"></i>;
        }
      } else {
        return null;
      }
    };

    return (
      <th {...props} onClick={this.handleClick}>
          {this.props.field.label}
          {sort()}
      </th>
    );
  }
}
