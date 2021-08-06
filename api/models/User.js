// const bcrypt = require('bcrypt');
module.exports = {
  attributes: {    
    email: {
      type:'string'
    },
    // name:  {
    //   type:'string'
    // },
    // number:{
    //   type:'string'
    // },
    hashedPassword:{
      type: 'string',
    },
    // todos: {
    //   collection: 'todo',
    //   via: 'user'
    // }

  },
  
  // beforeCreate(values, next) { 
  //   bcrypt.genSalt(10, (err, salt) => {
  //       if (err) {
  //           sails.log.error(err);
  //           return next();
  //       }
  //       bcrypt.hash(values.password, salt, (err, hash) => {
  //           if (err) {
  //               sails.log.error(err);
  //               return next();
  //           }
  //           values.encrytedpassword = hash;
  //           return next();
  //       });
  //   });
  // },

  // comparePassword(password, encryptedPassword) {
  //   return new Promise(function(resolve, reject) {
  //       bcrypt.compare(password, encryptedPassword, (err, match) => {
  //           if (err) {
  //               sails.log.error(err);
  //               return reject("Something went wrong!");
  //           }
  //           if (match) return resolve();
  //           else return reject("Mismatch passwords");
  //       });
  //   });
  // }

};

