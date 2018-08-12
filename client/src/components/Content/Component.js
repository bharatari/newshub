import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Admin, Devices } from '../';
import reservation from 'modules/reservation/utils';
import user from 'modules/user/utils';
import _ from 'lodash';

export default class Content extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    fields: PropTypes.object,
  };
  render() {
    const fields = () => {
      // Take user role
      // At basic level those with edit privalege get form
      // Others get content
      // loop through fields
      // ones with admin 
    };
    return (
      <div>
      </div>
    );
  }
}
