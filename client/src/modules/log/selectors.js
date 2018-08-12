import { createSelector } from 'reselect';
import _ from 'lodash';

const parsePage = (ownProps) => _.get(ownProps, 'location.query.page', null);

export const pageSelector = createSelector(
  parsePage,
  (page) => {
    if (parseInt(page)) {
      return parseInt(page);
    } else {
      return 1;
    }
  },
);
