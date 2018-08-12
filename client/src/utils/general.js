import _ from 'lodash';

export default {
  calculatePages(total, limit) {
    return Math.ceil(total / limit);
  },
  getCurrentPage(limit, skip) {
    return Math.floor(skip / limit) + 1;
  },
}
