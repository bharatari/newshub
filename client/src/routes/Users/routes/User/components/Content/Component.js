import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Master, Admin } from '../';
import userUtils from 'modules/user/utils';
import access from 'utils/access';
import { Row, Col } from 'antd'; 

export default class Content extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    currentUser: PropTypes.object,
    actions: PropTypes.object,
  };
  render() {
    // Make the form a modal
    // The main page should be a rich presentation profile-style presentation page

    let imageBackground;

    if (this.props.user.image) {
      imageBackground = {
        backgroundImage: 'url(' + this.props.user.image.url + ')',
      };
    }

    const { user: { organization_users: { title, roles, disabled } } } = this.props;
    const edit = access.has(this.props.roles, 'user:update');

    return (
      <div>
         <Row gutter={24}>          
          <Col span={8}>
            <div className={classes.imageBox} style={imageBackground}></div> 
            <h2 className={classes.name}>{this.props.user.fullName}</h2>
            <p>{title}</p>
            <p>{this.props.user.email}</p>
          </Col>
        </Row>
        
        <Row>
          <Col span={8}>

          </Col>

          <Col span={8}>
            <p><FormatDate date={this.props.user.createdAt} /></p>
            <p>{roles}</p>
            <p>{disabled ? 'True' : 'False'}</p>
          </Col>
        </Row>
      </div>
    );
  }
}
