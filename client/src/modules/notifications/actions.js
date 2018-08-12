import { createAction } from 'redux-actions';
import _ from 'lodash';

export const updateNotifications = createAction('UPDATE_NOTIFICATIONS');

export function pushNotification(notification) {
  return function (dispatch, getState) {
    const { notifications: notificationsState } = getState();

    const notifications = _.cloneDeep(notificationsState.notifications);

    notifications.push({
      id: notification.title + Date.now(),
      ...notification,
    });

    dispatch(updateNotifications(notifications));
  }
}

export function removeNotification(id) {
  return function (dispatch, getState) {
    const { notifications: notificationsState } = getState();

    const notifications = _.cloneDeep(notificationsState.notifications);

    _.remove(notifications, (n) => {
      return n.id === id;
    });

    dispatch(updateNotifications(notifications));
  }
}