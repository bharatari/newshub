import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(classes);

const tabs = classNames(
  classes.tabs,
  'ui secondary stackable pointing menu'
);

export default class Tabs extends React.Component {
  static propTypes = {
    fields: PropTypes.any,
  };
  componentDidMount() {
    $('.pointing.menu .item').tab();
  }
  componentDidUpdate() {
    $('.pointing.menu .item').tab('refresh');
  }
  render() {
    const headers = () => {
      let array = [];

      if (this.props.fields) {
        for (let i = 0; i < this.props.fields.length; i++) {
          const property = this.props.fields[i].label;
          const disabled = this.props.fields[i].disabled;

          const tab = cx(
            'item',
            {
              tabDisabled: disabled
            }
          );

          array.push(
            <div className={tab} key={property} data-tab={property}>{property}</div>
          );
        }        
      }

      return array;
    };

    return (
      <div>
        <div className={tabs}>
          {headers()}
        </div>
        {this.props.children}
      </div>
    );
  }
}
