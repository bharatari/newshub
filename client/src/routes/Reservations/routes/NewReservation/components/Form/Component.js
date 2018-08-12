import React from 'react';
import { Steps, Button, message } from 'antd';
import DateSelection from './DateSelection';
import Details from './Details';
import DeviceSelection from './DeviceSelection';

export default class Form extends React.Component {
  state = {
    current: 0,
  };
  componentWillUnmount() {
    this.props.actions.destroy('newReservation');
  }
  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };
  previous = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };
  render() {
    const { current } = this.state;
    const { onSubmit, ...commonProps } = this.props;

    const steps = [{
      title: 'Dates',
      component: DateSelection,
      props: {
        ...commonProps,
        onSubmit: this.next,
      },
    }, {
      title: 'Details',
      component: Details,
      props: {
        ...commonProps,
        previous: this.previous,
        onSubmit: this.next,
      },
    }, {
      title: 'Equipment',
      component: DeviceSelection,
      props: {
        ...commonProps,
        onSubmit,
        previous: this.previous,
      },
    }];

    const Component = steps[this.state.current].component;
    const props = steps[this.state.current].props;

    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Steps.Step key={item.title} title={item.title} icon={item.icon} />)}
        </Steps>
        <div className="steps-content">
          <Component {...props} />
        </div>
      </div>
    );
  }
}
