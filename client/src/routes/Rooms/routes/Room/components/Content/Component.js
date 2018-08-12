import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Schedule } from '../';
import Form from './Form';
import userUtils from 'modules/user/utils';
import access from 'utils/access';

export default class Content extends React.Component {
  static propTypes = {
    room: PropTypes.object,
    actions: PropTypes.object,
  };
  handleSubmit = (values) => {
    this.props.actions.updateRoom(this.props.room.id, values);
  };
  render() {
    const edit = access.has(this.props.roles, 'room:update');

    return (
      <div>
        {
          !edit && this.props.room ?
          <div>
            <p className={classes.header}>Name</p>
            <p className={classes.content}>{this.props.room.name}</p>
            <p className={classes.header}>Label</p>
            <p className={classes.content}>{this.props.room.label}</p>
            <p className={classes.header}>Description</p>
            <p className={classes.content}>{this.props.room.description}</p>
            <p className={classes.header}>Capacity</p>
            <p className={classes.content}>{this.props.room.capacity}</p>
            <p className={classes.header}>Building ID</p>
            <p className={classes.content}>{this.props.room.buildingId}</p>
            <p className={classes.header}>Disabled</p>
            <p className={classes.content}>{this.props.room.disabled ? 'Disabled.' : 'No.'}</p>
          </div>
          : null
        }
        <p className={classes.header}>Created At</p>
        <p className={classes.content}><FormatDate date={this.props.room.createdAt} /></p>
        {
          edit ?
          <div>
            <Form onSubmit={this.handleSubmit} />
          </div> : null
        }
        { this.props.roomReservations ? <Schedule roomReservations={this.props.roomReservations} /> : null }
      </div>
    );
  }
}
