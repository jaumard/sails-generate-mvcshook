/**
 * <%= createdAt %>
 */
module.exports = function (sails) {
  var loader = require("sails-util-mvcsloader")(sails);
  loader.configure(); // Load policies and config

  return {
    initialize: function (next) {
      loader.adapt(function (err) {
        return next(err);
      });
    }
  };
};
