module.exports = function () {
  return function (hook) {
    if (hook.type === 'before') {
      if (hook.params.query.$limit === '-1') {
        hook.params.paginate = false;

        delete hook.params.query.$limit;
      }
    } else {
      if (hook.params.paginate === false) {
        hook.result = {
          data: hook.result,
        };
      }
    }
  };
};
