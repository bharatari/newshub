import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { DateTime, AutoComplete, Radio } from 'components/';

export default ({ input, meta: { touched, error }, label, ...props }) => {
  const showError = touched && error;
  const status = showError ? 'error' : 'success';
  const help = showError ? error : null;

  if (props.type === 'datetime') {
    return (
      <Form.Item validateStatus={status} help={help} label={label}>
        <DateTime {...input} {...props} />
      </Form.Item>
    );
  } else if (props.type === 'textarea') {
    return (
      <Form.Item validateStatus={status} help={help} label={label}>
        <Input.TextArea {...input} {...props} />
      </Form.Item>
    );
  } else if (props.type === "autocomplete") {
    return (
      <Form.Item validateStatus={status} help={help} label={label}>
        <AutoComplete {...input} {...props} />
      </Form.Item>
    );
  } else if (props.type === "radiogroup") {
    return (
      <Form.Item validateStatus={status} help={help} label={label}>
        <Radio {...input} {...props} />
      </Form.Item>
    );
  } else if (props.type === "checkbox") {
    return (
      <Form.Item validateStatus={status} help={help} label={label}>
        <Checkbox {...input} {...props} />
      </Form.Item>
    );
  } else {
    return (
      <Form.Item validateStatus={status} help={help} label={label}>
        <Input {...input} {...props} />
      </Form.Item>
    );
  }  
};
