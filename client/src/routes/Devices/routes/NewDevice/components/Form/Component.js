import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Uploader } from 'components/';
import { Row, Col, Upload, Icon } from 'antd';
import device from 'modules/device/utils';

class NewDeviceForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit} className="ui form">
        <p className={classes.bigHeader}>General</p>

        <Row gutter={16}>
          <Col span={12}>
            <p className={classes.header}>Name</p>
            <Field name="name" component={Input} type="text" />
          </Col>
          <Col span={12}>
            <p className={classes.header}>Label</p>
            <Field name="label" component={Input} type="text" />
          </Col>        
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <p className={classes.header}>Type</p>
            <Field name="type" component={Input} type="text" />
          </Col>

          <Col span={8}>
            <p className={classes.header}>Barcode</p>
            <Field name="barcode" component={Input} type="text" />
          </Col>

          <Col span={8}>
            <p className={classes.header}>Quantity</p>
            <Field name="quantity" component={Input} type="number" />
          </Col>
        </Row>
        
        <p className={classes.bigHeader}>Thumbnail</p>

        <Field name="image" component={Uploader} createFile={this.props.createFile} uploadFile={this.props.uploadFile} uploadFieldName="file" />

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={12}>
            <p className={classes.header}>Description</p>
            <Field name="description" component="textarea" />
          </Col>

          <Col span={12}>
            <p className={classes.header}>Notes</p>
            <Field name="notes" component="textarea" />
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newDevice',
  validate: device.validateNewDevice,
})(NewDeviceForm);
