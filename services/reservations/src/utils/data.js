 const request = require('request-promise-native');
 const querystring = require('querystring');
 
 module.exports = {
   async getDeviceManagers(authorization) {
    try {
      const query = {
        deviceManager: true,
      };
  
      const qstring = querystring.stringify(query);
  
      const users = await request.get({
        url: `http://gateway/api/user?${qstring}`,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'authorization': authorization,
        },
      });

      return JSON.parse(users);
    } catch (e) {
      throw e;
    }
  },
 };
