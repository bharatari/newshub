import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading, Card, Status, Paginator } from 'components/';

export default class PaginatedTable extends React.Component {
  state = {
    sortField: null,
    sortType: null,
    page: 1,
  };
  componentWillMount() {
    if (this.props.sortField) {
      this.setState({
        sortField: this.props.sortField,
      });
    }

    if (this.props.sortType) {
      this.setState({
        sortType: this.props.sortType,
      });
    }

    if (this.props.page) {
      this.setState({
        page: this.props.page,
      })
    }
  }
  componentDidMount() {
    this.getData(this.state);
  }
  getData = (props) => {
    this.props.fetch({
      sortField: props.sortField,
      sortType: props.sortType,
      page: props.page,
      ...this.props.filter,
    });
  };
  goToPage = (page, event) => {
    this.setState({
      page,
    });

    const { sortField, sortType } = this.state;

    this.getData({
      sortField,
      sortType,
      page,
    });
  };
  sortBy = (sortField, sortType) => {
    this.setState({
      sortField,
      sortType,
    });

    const { page } = this.state;

    this.getData({
      sortField,
      sortType,
      page,
    });
  };
  render() {
    return (
      <div>
        <Card column="sixteen">
          {
            this.props.data ?
            <div>
              <Table fields={this.props.fields}
                data={this.props.data} 
                actions={this.props.actions}
                route={this.props.route} 
                sortBy={this.sortBy}
                sortField={this.state.sortField} 
                sortType={this.state.sortType} 
                sortable={true} />
              <Paginator currentPage={this.state.page} 
                totalPages={this.props.totalPages}
                goToPage={this.goToPage} />
            </div>
            : <TextLoading loading={this.props.loading} />
          }
        </Card>
      </div>
    );
  }
}
