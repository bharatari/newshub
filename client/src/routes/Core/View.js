import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { nonSidebarRoutes } from 'constants/routes';
import _ from 'lodash';

export default class CoreView extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    user: PropTypes.object,
  };
  render() {
    return this.props.children;
  }
}
