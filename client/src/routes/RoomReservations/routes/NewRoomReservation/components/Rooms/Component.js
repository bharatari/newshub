import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';

export default class Rooms extends React.Component {
  static propTypes = {
    rooms: PropTypes.array,
  };
  render() {
    const renderRooms = () => {
      const list = [];

      this.props.rooms.map((room) => {
        list.push(
          <div className={classes.device} key={room.id}>
            <p className={classes.content}>{room.label}</p>
            <p className={classes.name}>{room.name}</p>
          </div>
        );
      });

      return list;
    };

    return (
      <div className={classes.devices}>
        {renderRooms()}
      </div>
    );
  }
}
