module.exports = function (options) {
  return async function (hook) {
    if (hook.method === 'create' && hook.type === 'before') {
      hook.data.user = hook.params.user;
    }

    return hook;    
  }
}
