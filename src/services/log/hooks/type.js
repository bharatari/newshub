module.exports = function () {
  return function (hook) {
    // If the latest record is a check-in with that user id
    // for that event within the last 24 hours, mark as a check-out
  
    // Disregard multiple check-ins within 5 minutes

    hook.data.type = 'clock-in';

    return hook;    
  };
};
