exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: require('lodash').upperCase("Hello, World!!")
  });
}
