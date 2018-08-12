import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import userUtils from 'modules/user/utils';
import access from 'utils/access';
import _ from 'lodash';

export default class Field extends React.Component {
  static propTypes = {
    object: PropTypes.any,
    field: PropTypes.object,
    user: PropTypes.object,
    roles: PropTypes.array,
  };
  render() {
    const { object, field, user, roles } = this.props;

    const display = access.has(this.props.roles, field.role);

    const data = () => {
      if (field.component) {
        return <field.component {...field.props} />;
      } else if (field.custom) {
        return field.custom(object);
      } else {
        return _.get(object, field.property);
      }
    };

    const result = () => {
      if (data()) {
        return data();
      } else {
        if (field.default) {
          return field.default;
        } else {
          return '';
        }
      }
    };

    return (
      <div>
        <p style={field.headerStyle} className={classes.header}>{field.label}</p>
        <p style={field.contentStyle} className={classes.content}>{result()}</p>
      </div>
    );
  }
}
