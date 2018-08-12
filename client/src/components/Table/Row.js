import React, { PropTypes } from 'react';
import _ from 'lodash';
import { FormatDate } from 'components/';
import classes from './Styles.scss';

export default class Row extends React.Component {
  static propTypes = {
    fields: PropTypes.array,
    data: PropTypes.object,
    route: PropTypes.string,
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    newTab: PropTypes.bool,
  };
  handleClick = () => {
    if (this.props.newTab) {
      window.open(this.props.route + '/' + this.props.data.id);
    } else if (this.props.modal) {
      this.props.showModal(this.props.data.id);
    } else {
      this.props.actions.push(this.props.route + '/' + this.props.data.id);          
    }
  };
  render() {
    const processField = (field, data) => {
      let result;

      if (field.custom) {
        result = field.custom(data);
      } else if (field.component) {
        const Component = field.component;

        result = <Component data={data} />;
      } else {
        result = _.get(data, field.property);
      }

      if (field.type) {
        if (field.type === 'date') {
          return <FormatDate date={result} />;
        } else if (field.type === 'datetime') {
          return <FormatDate datetime={result} />;
        }
      }

      return result;
    };
    const cells = () => {
      let array = [];
      let counter = 0;

      this.props.fields.map((field) => {
        if (counter == 0) {
          array.push(<td key={counter} className={classes.first}>{processField(field, this.props.data)}</td>)
        } else {
          array.push(<td key={counter} className={classes.n}>{processField(field, this.props.data)}</td>)
        }
        
        counter++;
      });

      return array;
    };

    return (
      <tr className={classes.clickable} onClick={this.handleClick}>
        {cells()}
      </tr>
    );
  }
}
