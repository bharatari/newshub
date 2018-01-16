 const request = require('request-promise-native');
 
 module.exports = {
   async getUser(authorization, id) {
     try {
       const user = await request.get({
         url: `http://gateway:8080/api/user/${id}`,
         headers: {
           'content-type': 'application/json; charset=utf-8',
           'authorization': authorization,
         },
       });
 
       return JSON.parse(user);
     } catch (e) {
       throw e;
     }
   }
 };
 