module.exports = function () {
  return function (hook) {
    hook.data.type = 'clock-in';

    return hook;
    // if the latest record is a check-in with that user id
    // for that event within the last 24 hours, mark as a check-out

    // Validate that the eventId is valid

    // disregard multiple check-ins within 5 minutes
  };
};
