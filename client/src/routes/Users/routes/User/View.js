import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';
import { Content, Master } from './components';

export default class UserView extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    requestingUser: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.resetUpdateUser();
    this.props.actions.resetFetchUser();
    this.props.actions.fetchUser(this.props.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedUser && !nextProps.requestingUpdateUser) {
      if (!this.state.updated) {
        this.props.actions.fetchUser(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateUser) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { currentUser, user, requestingUser, error, actions, currentUrl, updatedUser, updateUser, requestingUpdateUser } = this.props;
    const successHeader = 'You successfully updated this user.';

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="User" loading={requestingUser || requestingUpdateUser} user={currentUser}
          roles={this.props.roles}>
          <Card column="sixteen">
            <Response error={this.props.updateError} response={this.props.updatedUser}
            successHeader={successHeader} />
            {
              user ? 
              <Master user={this.props.user} updateUser={updateUser} actions={actions} currentUser={currentUser} roles={this.props.roles} /> :
              <TextLoading loading={requestingUser} /> 
            }
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
