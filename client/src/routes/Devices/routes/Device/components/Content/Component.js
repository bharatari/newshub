import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate, Response } from 'components/';
import Form from './Form';
import userUtils from 'modules/user/utils';
import access from 'utils/access';
import { Row, Col, Modal, Calendar } from 'antd'; 

export default class Content extends React.Component {
  static propTypes = {
    device: PropTypes.object,
    actions: PropTypes.object,
  };
  handleSubmit = (values) => {
    this.props.actions.updateDevice(this.props.device.id, values);
  };
  handleOk = () => {
    this.refs.form.getWrappedInstance().submit();

    this.props.hideEditModal();
  };
  handleCancel = () => {
    this.props.hideEditModal();
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.updateDevice.requesting && !nextProps.updateDevice.requesting) {
      if (this.props.updateDevice.device) {
        this.props.hideEditModal();
      }
    }
  }
  render() {
    const { updateDevice } = this.props;
    let imageBackground;

    if (this.props.device.image) {
      imageBackground = {
        backgroundImage: 'url(' + this.props.device.image + ')',
      };
    }

    const quantity = classNames(
      'ion-ios-infinite',
      classes.icon
    );

    const barcode = classNames(
      'ion-ios-barcode',
      classes.icon
    );

    const disabled = classNames(
      'ion-ios-pulse-strong',
      classes.icon
    );

    return (
      <div>
         <Modal title="Edit Device" visible={this.props.showEditModal} okText="Update" cancelText="Cancel" onOk={this.handleOk} onCancel={this.handleCancel}>
          <Response response={updateDevice.log} error={updateDevice.error} successText="Successfully updated" />
          <Form ref="form" onSubmit={this.handleSubmit} />
        </Modal>

        <Row className={classes.mainRow}>          
          <Col span={24} className={classes.mainColumn}>
            <div className={classes.imageBox} style={imageBackground}></div>
            <div className={classes.mainDetails}>
              <h2 className={classes.deviceLabel}>{this.props.device.label}</h2>
              <p className={classes.deviceName}>{this.props.device.label}</p>
            </div>
          </Col>
        </Row>

        <div className={classes.padding}>
          <Row className={classes.descriptionRow}>
            <p className={classes.description}>{this.props.device.description}</p>
          </Row>

          <div className={classes.infoBox}>
            <Row>
              <Col span={6}>
                <p className={classes.infoHeader}>Category</p>
                <p className={classes.category}>{this.props.device.type}</p>
              </Col>
              <Col span={6}>
                <p className={classes.infoHeader}>Quantity</p>
                <i className={quantity} style={{ color: '##f759ab' }}></i><p className={classes.quantity}>{this.props.device.quantity}</p>
              </Col>
              <Col span={6}>
                <p className={classes.infoHeader}>Barcode</p>
                <i className={barcode} style={{ color: 'rgb(234, 192, 94)' }}></i><p className={classes.barcode}>{this.props.device.barcode}</p>
              </Col>
              <Col span={6}>
                <p className={classes.infoHeader}>Disabled</p>
                <i className={disabled} style={{ color: '#531dab' }}></i><p className={classes.disabled}>{this.props.device.disabled ? 'True' : 'False'}</p>
              </Col>
            </Row>
          </div>

          <Row className={classes.activityRow}>
            <Col span={12}>
              <h2 className={classes.activityHeader}>Reservations</h2>
              <div style={{ padding: '50px' }}>
                <Calendar />
              </div>
            </Col>
            <Col span={12}>
              <h2 className={classes.activityHeader}>Activity</h2>
              <div className={classes.activityBox}>
                <ul>
                  <li>
                    <strong>{this.props.device.label}</strong> was added on <FormatDate datetime={this.props.device.createdAt} />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
