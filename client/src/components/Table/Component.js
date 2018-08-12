import React, { PropTypes } from 'react';
import Row from './Row';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Modal } from 'components/';
import HeaderCell from './HeaderCell';

const table = classNames(
  'ui selectable very basic table',
  classes.table
);

export default class Table extends React.Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    data: PropTypes.array,
    route: PropTypes.string,
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    newTab: PropTypes.bool,
    modal: PropTypes.bool,
    showModal: PropTypes.func,
    sortable: PropTypes.bool,
  };
  render() {
    const headers = () => {
      let array = [];

      this.props.fields.map((field) => {
        const cell = (
          <HeaderCell
            key={field.property}
            field={field}
            className={classes.header}
            sortType={this.props.sortType} 
            sortField={this.props.sortField}
            sortBy={this.props.sortBy} 
            sortable={this.props.sortable} />
        );

        array.push(cell);
      });

      return array;
    };
    const rows = () => {
      let array = [];
      let counter = 0;

      if (this.props.data) {
        this.props.data.map((item) => {
          array.push(<Row key={counter} fields={this.props.fields}
                      data={item} route={this.props.route}
                      actions={this.props.actions}
                      newTab={this.props.newTab}
                      modal={this.props.modal}
                      showModal={this.props.showModal} />);
          counter++;
        });
      }
      
      return array;
    };

    return (
      <table className={table}>
        <thead>
          <tr>
            {headers()}
          </tr>
        </thead>
        <tbody>
          {rows()}
        </tbody>
      </table>
    );
  }
}
