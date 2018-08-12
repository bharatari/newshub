module.exports = function (options) {
  return function (hook) {
    if (hook.method === 'create') {
      hook.data.startDate = new Date(hook.data.startDate);
      hook.data.endDate = new Date(hook.data.endDate);
    }

    hook.params.devices = hook.data.devices;
    
    delete hook.data.devices;

    return hook;
  };
};
