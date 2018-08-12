import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import Form from './Form';
import { Modal } from 'components/';
import { Menu, Dropdown, Icon } from 'antd';

export default class AdminNotes extends React.Component {
  static propTypes = {
    reservation: PropTypes.object,
    requestingReservation: PropTypes.bool,
  };
  state = {
    visible: false,
  };
  handleAdminNotes = (values) => {
    this.props.actions.updateReservation(this.props.reservation.id, values);
  };
  handleClick = () => {
    if (this.props.allowEditing) {
      this.setState({
        visible: true,
      });
    }
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });

    this.refs.form.submit();
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { reservation } = this.props;
    const { adminNotes } = reservation;

    const notes = classNames(
      classes.notes,
      { [classes.notesHover]: this.props.allowEditing }
    );

    return (
      <div className={classes.container}>
        <Modal title="Edit Admin Notes" visible={this.state.visible} okText="Update" cancelText="Cancel" onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form ref="form" onSubmit={this.handleAdminNotes} initialValues={this.props.reservation} />
        </Modal>
        <p className={notes} onClick={this.handleClick}>{ adminNotes ? adminNotes : 'None.' }</p>
      </div>
    );
  }
}
