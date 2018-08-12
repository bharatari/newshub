import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Card, Modal, Response } from 'components/';
import { Form, Wizard, ModalContent } from './components';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from 'antd';
import _ from 'lodash';

export default class NewEventView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  componentDidMount() {
    this.props.actions.resetCreateEvent();
  }
  handleSubmit = (values) => {
    this.props.actions.createEvent(values);
    scroll.scrollToTop();
  };
  handleClick = () => {
    this.refs.form.submit();
  };
  render() {
    const disable = this.props.requestingCreateEvent || this.props.createdEvent;
    const loading = this.props.requestingCreateEvent;

    const right = (
      <Button onClick={this.handleClick} loading={loading} disabled={disable} type="primary" ghost>
        Save
      </Button>
    );

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New Event" right={right} loading={loading} user={this.props.user}
          roles={this.props.roles}>
          <Card column="sixteen">
            <Response error={this.props.error} response={this.props.createdEvent}
              successHeader="Your event has been created" />
            <Form ref="form" requestingCreateEvent={this.props.requestingCreateEvent}
              onSubmit={this.handleSubmit} />
            {right}
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
;