import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Input } from 'components/';
import { Row, Col, Upload, Icon } from 'antd';
import device from 'modules/device/utils';

const button = classNames(
  'ui button blue button-light',
  classes.button
);

class DeviceForm extends React.Component {
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

        <Upload.Dragger multiple={false} name="image" listType="picture">
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag image to this area to upload</p>
          <p className="ant-upload-hint">Square images work best</p>
        </Upload.Dragger>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={12}>
            <p className={classes.header}>Description</p>
            <Field name="description" component={Input} type="textarea" className={classes.font} />
          </Col>

          <Col span={12}>
            <p className={classes.header}>Notes</p>
            <Field name="notes" component={Input} type="textarea" className={classes.font} />
          </Col>
        </Row>

        <Row gutter={16}>
          <p className={classes.header}>Disabled</p>
          <Field name="disabled" type="checkbox" component={Input} className={classes.font} />
        </Row>
      </form>
    );
  }
}

DeviceForm = reduxForm({
  form: 'device',
})(DeviceForm);

DeviceForm = connect(
  state => ({
    initialValues: state.device.fetchDevice.device,
  }),
  null,
  null,
  { withRef: true }
)(DeviceForm);

export default DeviceForm;
