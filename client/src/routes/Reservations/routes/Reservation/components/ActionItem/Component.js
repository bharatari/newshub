import _ from 'lodash';
import { FormatDate } from 'components/';
import React from 'react';

const ActionItem = ({ action })  => {
  const name = _.get(action, 'user.fullName');
  const date = _.get(action, 'createdAt');
  const actionPerformed = _.get(action, 'action');
  
  const getDescription = () => {
    if (actionPerformed === 'approved') {
      return 'approved this on';
    } else if (actionPerformed === 'checkedOut') {
      return 'checked this out on';
    } else if (actionPerformed === 'checkedIn') {
      return 'checked this in on';
    } else if (actionPerformed === 'disabled') {
      return 'disabled this on';
    } else if (actionPerformed === 'rejected') {
      return 'rejected this on';
    } else {
      return 'modified this on';
    }
  };

  return (
    <li>
      <strong>{name}</strong> {getDescription()} <FormatDate datetime={date} />
    </li>
  );
};

export default ActionItem;
