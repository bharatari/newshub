import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Input } from 'components/';
import { Alert, Row, Col, Icon, Button } from 'antd';
import user from 'modules/user/utils';

class UserForm extends React.Component {
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
        <p className={classes.bigHeader}>Profile</p>

        <Row gutter={16}>
          <Col md={12} sm={24}>
            <p className={classes.header}>First Name</p>
            <Field name="firstName" component={Input} type="text" />
          </Col>
        
          <Col md={12} sm={24}>
            <p className={classes.header}>Last Name</p>
            <Field name="lastName" component={Input} type="text" />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col md={12} sm={24}>
            <p className={classes.header}>Email Address</p>
            <Field name="email" component={Input} type="email" />
          </Col>
        
          <Col md={12} sm={24}>
            <p className={classes.header}>Title</p>
            <Field name="organization_users.title" placeholder="What position does this user have?" component={Input} type="text" />
          </Col>
        </Row>

        <p className={classes.bigHeader}>Details</p>
       
        <Row gutter={16}>
          <Col md={12} sm={24}>
            <p className={classes.header}>Barcode</p>
            <Field name="organization_users.barcode" placeholder="A unique barcode value associated to the user" component={Input} type="text" />
          </Col>

          <Col md={12} sm={24}>
            <p className={classes.header}>User Code</p>
            <Field name="organization_users.meta.code" placeholder="A unique identifier such as user initials" component={Input} type="text" />
          </Col>
        </Row>

        <p className={classes.header}>Roles</p>
        <Field name="organization_users.roles" placeholder="What permissions should this user have?" component={Input} type="text" />

        <Button type="primary" htmlType="submit" loading={this.props.updateUser.loading}>Save</Button>
      </form>
    );
  }
}

UserForm = reduxForm({
  form: 'user',
})(UserForm);


UserForm = connect(
  state => ({
    initialValues: state.user.fetchUser.user,
  }),
)(UserForm);

export default UserForm;
