'use strict';

// NOTE: this isn't currently functional; we're using the serverless CLI instead

// Load environment variables
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Setup dependencies
const request = require('request');
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);

// Required in responses for CORS support to work
const headers = {'Access-Control-Allow-Origin': '*'};

exports.handler = function(event, context, callback) {

  console.log("testing");

  // Try to actually send the message
  const sms = {
    to: event.body.to,
    body: event.body.message || '',
    from: twilioPhoneNumber,
  };

  twilioClient.messages.create(sms, (error, data) => {
    if (error) {

      const twilioErrResponse = {
        headers: headers,
        statusCode: 404,
        body: {
          status: 'fail',
          message: error.message,
          error: error
        }
      };

      return callback(null, twilioErrResponse);
    }
    // If no errors: Return success response!

    const successResponse = {
      headers: headers,
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Text message successfully sent!',
        body: data.body,
        created: data.dateCreated
      }
    };

    callback(null, successResponse);
  });
};
